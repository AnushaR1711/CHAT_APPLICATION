const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// File upload
const upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Database
const db = require('./database');

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const existingUser = await db.get('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        await db.run(
            'INSERT INTO users (id, username, email, password, status) VALUES (?, ?, ?, ?, ?)',
            [userId, username, email, hashedPassword, 'offline']
        );

        const token = jwt.sign({ userId, username, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: userId, username, email, status: 'offline' }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update status to online
        await db.run('UPDATE users SET status = ? WHERE id = ?', ['online', user.id]);

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                status: 'online'
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Users route
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await db.all(
            'SELECT id, username, email, avatar, status FROM users WHERE id != ? ORDER BY username',
            [req.user.userId]
        );
        res.json({ success: true, users });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Rooms routes
app.get('/api/rooms', authenticateToken, async (req, res) => {
    try {
        const rooms = await db.all(`
            SELECT r.*, 
                   CASE WHEN rm.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member
            FROM rooms r
            LEFT JOIN room_members rm ON r.id = rm.room_id AND rm.user_id = ?
            ORDER BY r.created_at DESC
        `, [req.user.userId]);

        res.json({ success: true, rooms });
    } catch (error) {
        console.error('Get rooms error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/rooms', authenticateToken, async (req, res) => {
    try {
        const { name, description, type = 'public' } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Room name is required' });
        }

        const roomId = uuidv4();
        await db.run(
            'INSERT INTO rooms (id, name, description, type, admin_id) VALUES (?, ?, ?, ?, ?)',
            [roomId, name, description, type, req.user.userId]
        );

        // Add creator as member
        await db.run(
            'INSERT INTO room_members (room_id, user_id) VALUES (?, ?)',
            [roomId, req.user.userId]
        );

        const room = await db.get('SELECT * FROM rooms WHERE id = ?', [roomId]);
        res.status(201).json({ success: true, room, message: 'Room created successfully' });
    } catch (error) {
        console.error('Create room error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/rooms/:id/join', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Check if room exists
        const room = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Add user to room
        await db.run(
            'INSERT OR IGNORE INTO room_members (room_id, user_id) VALUES (?, ?)',
            [id, req.user.userId]
        );

        res.json({ success: true, message: 'Joined room successfully' });
    } catch (error) {
        console.error('Join room error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Messages routes
app.get('/api/messages/room/:roomId', authenticateToken, async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await db.all(`
            SELECT m.*, u.username 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.room_id = ?
            ORDER BY m.created_at ASC
            LIMIT 50
        `, [roomId]);

        res.json({ success: true, messages });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/messages/private/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await db.all(`
            SELECT m.*, u.username 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE (m.sender_id = ? AND m.recipient_id = ?) OR (m.sender_id = ? AND m.recipient_id = ?)
            ORDER BY m.created_at ASC
            LIMIT 50
        `, [req.user.userId, userId, userId, req.user.userId]);

        res.json({ success: true, messages });
    } catch (error) {
        console.error('Get private messages error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/messages', authenticateToken, async (req, res) => {
    try {
        const { content, room_id, recipient_id, type = 'text' } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const messageId = uuidv4();
        await db.run(
            'INSERT INTO messages (id, sender_id, content, type, room_id, recipient_id) VALUES (?, ?, ?, ?, ?, ?)',
            [messageId, req.user.userId, content, type, room_id, recipient_id]
        );

        const message = await db.get(`
            SELECT m.*, u.username 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.id = ?
        `, [messageId]);

        res.status(201).json({ success: true, message });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Socket.io
const onlineUsers = new Map();

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log(`🔗 User connected: ${socket.user.username}`);

    // Add to online users
    onlineUsers.set(socket.user.userId, {
        id: socket.user.userId,
        username: socket.user.username,
        socketId: socket.id
    });

    // Update user status in database
    db.run('UPDATE users SET status = ? WHERE id = ?', ['online', socket.user.userId]);

    // Broadcast online status
    socket.broadcast.emit('user_online', {
        userId: socket.user.userId,
        username: socket.user.username
    });

    // Join room
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`${socket.user.username} joined room ${roomId}`);
    });

    // Send message
    socket.on('send_message', async (data) => {
        try {
            const { content, room_id, recipient_id, type = 'text' } = data;
            const messageId = uuidv4();

            await db.run(
                'INSERT INTO messages (id, sender_id, content, type, room_id, recipient_id) VALUES (?, ?, ?, ?, ?, ?)',
                [messageId, socket.user.userId, content, type, room_id, recipient_id]
            );

            const message = await db.get(`
                SELECT m.*, u.username 
                FROM messages m
                JOIN users u ON m.sender_id = u.id
                WHERE m.id = ?
            `, [messageId]);

            const messageData = {
                ...message,
                sender: {
                    id: socket.user.userId,
                    username: socket.user.username
                }
            };

            if (room_id) {
                io.to(room_id).emit('receive_message', messageData);
            } else if (recipient_id) {
                const recipientSocket = Array.from(onlineUsers.values())
                    .find(user => user.id === recipient_id);
                if (recipientSocket) {
                    io.to(recipientSocket.socketId).emit('receive_message', messageData);
                }
                socket.emit('receive_message', messageData);
            }
        } catch (error) {
            console.error('Socket message error:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });

    // Typing indicators
    socket.on('typing', (data) => {
        const { room_id, recipient_id } = data;
        const typingData = {
            userId: socket.user.userId,
            username: socket.user.username
        };

        if (room_id) {
            socket.to(room_id).emit('user_typing', typingData);
        } else if (recipient_id) {
            const recipientSocket = Array.from(onlineUsers.values())
                .find(user => user.id === recipient_id);
            if (recipientSocket) {
                io.to(recipientSocket.socketId).emit('user_typing', typingData);
            }
        }
    });

    socket.on('stop_typing', (data) => {
        const { room_id, recipient_id } = data;
        const stopTypingData = {
            userId: socket.user.userId,
            username: socket.user.username
        };

        if (room_id) {
            socket.to(room_id).emit('user_stop_typing', stopTypingData);
        } else if (recipient_id) {
            const recipientSocket = Array.from(onlineUsers.values())
                .find(user => user.id === recipient_id);
            if (recipientSocket) {
                io.to(recipientSocket.socketId).emit('user_stop_typing', stopTypingData);
            }
        }
    });

    // Disconnect
    socket.on('disconnect', async () => {
        console.log(`🔌 User disconnected: ${socket.user.username}`);

        // Remove from online users
        onlineUsers.delete(socket.user.userId);

        // Update status in database
        await db.run('UPDATE users SET status = ? WHERE id = ?', ['offline', socket.user.userId]);

        // Broadcast offline status
        socket.broadcast.emit('user_offline', {
            userId: socket.user.userId,
            username: socket.user.username
        });
    });
});

// Start server
async function startServer() {
    try {
        await db.connect();
        
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`🚀 Chat App running on port ${PORT}`);
            console.log(`📱 Open http://localhost:${PORT} in your browser`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
