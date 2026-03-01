# 🌊 ChatWave — Real-Time Chat Application

A **full-stack, real-time chat application** built with Node.js, Express, Socket.io, and SQLite. Features a premium dark UI, group rooms, private messaging, emoji picker, typing indicators, and more.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Authentication** | JWT-based register & login with password hashing (bcrypt) |
| **Real-time messaging** | Powered by Socket.io — zero page refresh needed |
| **Group Rooms** | Create public or private rooms, join/leave |
| **Private DMs** | One-on-one private conversations |
| **Typing Indicators** | Live "X is typing…" with animated dots |
| **Online Presence** | Real-time online/offline status for all users |
| **Emoji Picker** | 8 emoji categories with search |
| **Message Search** | Highlight matching messages inline |
| **Chat Info Panel** | View room details, message count, descriptions |
| **Message Formatting** | Supports **bold**, *italic*, `code`, and hyperlinks |
| **Session Persistence** | Stay logged in across page refreshes |
| **Password Strength** | Live password strength indicator on signup |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express 4, Socket.io 4
- **Database:** SQLite (via sqlite3)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **File Uploads:** Multer
- **Frontend:** Vanilla JS (ES6 Class), CSS3 Custom Properties
- **Fonts:** Inter (Google Fonts)
- **Icons:** Font Awesome 6

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ 
- npm v7+

### Installation

```bash
# 1. Navigate to project folder
cd real-time-chat-app

# 2. Install dependencies
npm install

# 3. Configure environment
# Edit .env file (already has defaults for development)

# 4. Start the server
npm start
# OR for development with auto-reload:
npm run dev
```

### Access the App
Open your browser and go to:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
real-time-chat-app/
├── public/
│   ├── index.html       # Main HTML (auth + chat screens)
│   ├── style.css        # Premium dark theme CSS
│   ├── app.js           # Frontend JavaScript class
│   └── uploads/         # User-uploaded files
├── server.js            # Express + Socket.io server
├── database.js          # SQLite database helper
├── .env                 # Environment configuration
├── chat.db              # SQLite database file (auto-created)
└── package.json
```

---

## ⚙️ Environment Variables

```env
PORT=3000
JWT_SECRET=your_super_secret_key_here  # Change this in production!
NODE_ENV=development
```

---

## 📡 API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |

### Users
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/users` | Get all users (except self) |

### Rooms
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/rooms` | Get all rooms |
| `POST` | `/api/rooms` | Create a new room |
| `POST` | `/api/rooms/:id/join` | Join a room |

### Messages
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/messages/room/:roomId` | Get room messages |
| `GET` | `/api/messages/private/:userId` | Get private messages |
| `POST` | `/api/messages` | Send a message via REST |

---

## 🔌 Socket.io Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `join_room` | `roomId: string` | Join a socket room |
| `send_message` | `{content, room_id?, recipient_id?, type}` | Send a chat message |
| `typing` | `{room_id?, recipient_id?}` | Signal typing started |
| `stop_typing` | `{room_id?, recipient_id?}` | Signal typing stopped |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `receive_message` | Message object | New message received |
| `user_online` | `{userId, username}` | User came online |
| `user_offline` | `{userId, username}` | User went offline |
| `user_typing` | `{userId, username}` | User is typing |
| `user_stop_typing` | `{userId, username}` | User stopped typing |

---

## 🗄 Database Schema

```sql
-- Users
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    status TEXT DEFAULT 'offline',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'public',
    admin_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Room Members
CREATE TABLE room_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, user_id)
);

-- Messages
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'text',
    room_id TEXT,
    recipient_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎨 UI Features in Detail

- **Premium dark theme** with CSS custom properties
- **Glassmorphism** auth screen with animated blobs
- **Gradient avatars** — unique color per user/room
- **Message grouping** — consecutive messages from same user are grouped
- **Smooth animations** — all state changes are animated
- **Toast notifications** — slide-in toasts with icons
- **Info panel** — slide-in details panel for rooms/DMs
- **Emoji picker** — 8 categories, 500+ emojis
- **Auto-growing textarea** — message input grows as you type

---

## 🔒 Security

- Passwords hashed with **bcrypt** (salt rounds: 10)
- **JWT tokens** with 7-day expiry
- Socket.io connections authenticated with JWT middleware
- HTML is escaped before rendering to prevent XSS

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 900px` | Full 3-column layout |
| `640–900px` | Sidebar collapses to 260px, info panel hidden |
| `< 640px` | Sidebar off-canvas (hamburger menu) |

---

## 🏗 Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong, random `JWT_SECRET`
3. Use a process manager like PM2: `pm2 start server.js`
4. Put behind a reverse proxy (Nginx/Caddy) with HTTPS

---

## 📄 License

MIT © 2024 ChatWave
