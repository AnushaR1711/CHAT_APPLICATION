/**
 * ChatWave — Frontend Application
 * Real-time chat with Socket.io
 */

/* ======================================================
   EMOJI DATA
   ====================================================== */
const EMOJI_DATA = {
    smileys: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐'],
    gestures: ['👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿'],
    people: ['👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇','🤦','🤷','👮','🕵️','💂','🥷','👷','🤴','👸','👳','👲','🧕','🤵','👰','🤰','��','🧑‍🍼','🎅','🤶','🦸','🦹','🧙','🧝','🧛','🧟','🧞','🧜','🧚'],
    animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔'],
    food: ['🍎','🍊','🍋','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🥕','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🧀','🥚','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥮','🍢','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🧃','🥤','🧋','☕','🍵','🫖','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉'],
    travel: ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🛵','🏍️','🛺','🚲','🛴','🛹','🛼','🚏','🛣️','🛤️','⛽','🛞','🚨','🚥','🚦','🛑','🚧','⚓','🛟','⛵','🛶','🚤','🛥️','🛳️','⛴️','🚢','✈️','🛩️','🛫','🛬','🪂','💺','🚁','🚟','🚠','🚡','🛰️','🚀','🛸','🪐','🌍','🌎','🌏','🗺️','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕','🕍','⛩️','🕋'],
    objects: ['💡','🔦','🕯️','🪔','🧱','💰','💴','💵','💶','💷','💸','💳','🪙','💹','📈','📉','📊','📋','📌','📍','📎','🖇️','📏','📐','✂️','🗃️','🗄️','🗑️','🔒','🔓','🔏','🔐','🔑','🗝️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','🛡️','🪚','🔧','🪛','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🪝','🧲','🔬','🔭','📡','💉','🩸','💊','🩹','🩺','🩻','🚪','🛗','🪞','🪟','🛏️','🛋️','🪑','🚽','🪠','🚿','🛁','🪤','🪒','🧴','🧷','🧹','🧺','🧻','🪣','🧼','🫧','🧽','🧯','🛒','🚪'],
    symbols: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','❤️‍🔥','❤️‍🩹','💔','💌','💋','💯','💢','💥','💫','💦','💨','🕳️','💬','👁️‍🗨️','💭','💤','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔶','🔷','🔸','🔹','🔺','🔻','💠','🔘','🔳','🔲','☑️','🔰','♻️','✅','❎','🆒','🆓','🆕','🆙','🆚','🈶','🈚','🈷️','🈶','🉐','㊙️','㊗️','🆙','🉑','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💮','♀️','♂️','⚕️','♻️','✔️','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🛐','⚛️','🕉️','✝️','☦️','🛐','☸️','✡️','🔯','🕎','☯️','☪️','🩯','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎']
};

/* ======================================================
   CHAT APP CLASS
   ====================================================== */
class ChatApp {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.currentChat = null;
        this.token = localStorage.getItem('chatwave_token');
        this.rooms = [];
        this.users = [];
        this.typingTimer = null;
        this.isTyping = false;
        this.emojiPickerOpen = false;
        this.currentEmojiCat = 'smileys';
        this.msgCount = 0;

        this.init();
    }

    /* --------------------------------------------------
       INIT
    -------------------------------------------------- */
    async init() {
        this.bindUIEvents();
        this.renderEmojiGrid(this.currentEmojiCat);

        if (this.token) {
            // Try to restore session
            const userData = localStorage.getItem('chatwave_user');
            if (userData) {
                try {
                    this.currentUser = JSON.parse(userData);
                    this.showChatScreen();
                    this.connectSocket();
                } catch {
                    this.clearSession();
                }
            } else {
                this.clearSession();
            }
        } else {
            this.showAuthScreen();
        }
    }

    clearSession() {
        localStorage.removeItem('chatwave_token');
        localStorage.removeItem('chatwave_user');
        this.token = null;
        this.currentUser = null;
        this.showAuthScreen();
    }

    /* --------------------------------------------------
       UI EVENT BINDING
    -------------------------------------------------- */
    bindUIEvents() {
        // Auth tab switching
        document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', e => this.switchAuthTab(e.currentTarget.dataset.tab));
        });

        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', e => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', e => this.handleRegister(e));

        // Password toggles
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', e => this.togglePasswordVisibility(e.currentTarget));
        });

        // Password strength
        document.getElementById('registerPassword').addEventListener('input', e => {
            this.updatePasswordStrength(e.target.value);
        });

        // Sidebar tabs
        document.querySelectorAll('.sidebar-tab').forEach(btn => {
            btn.addEventListener('click', e => this.switchSidebarTab(e.currentTarget.dataset.tab));
        });

        // Sidebar search
        document.getElementById('sidebarSearch').addEventListener('input', e => this.filterSidebarItems(e.target.value));

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        // Create room
        document.getElementById('createRoomBtn').addEventListener('click', () => this.showCreateRoomModal());
        document.getElementById('welcomeCreateRoomBtn').addEventListener('click', () => this.showCreateRoomModal());
        document.getElementById('closeModal').addEventListener('click', () => this.hideCreateRoomModal());
        document.getElementById('cancelCreateRoom').addEventListener('click', () => this.hideCreateRoomModal());
        document.getElementById('createRoomForm').addEventListener('submit', e => this.handleCreateRoom(e));

        // Close modal on backdrop click
        document.getElementById('createRoomModal').addEventListener('click', e => {
            if (e.target === e.currentTarget) this.hideCreateRoomModal();
        });

        // Room description char count
        document.getElementById('roomDescription').addEventListener('input', e => {
            document.getElementById('descCharCount').textContent = `${e.target.value.length} / 200`;
        });

        // Message form
        document.getElementById('messageInput').addEventListener('keydown', e => this.handleMessageKeydown(e));
        document.getElementById('messageInput').addEventListener('input', () => {
            this.autoResizeTextarea();
            this.handleTypingStart();
        });
        document.getElementById('messageInput').addEventListener('blur', () => this.handleTypingStop());
        document.getElementById('sendMessageBtn').addEventListener('click', () => this.sendMessage());

        // Chat header actions
        document.getElementById('chatSearchBtn').addEventListener('click', () => this.toggleMessageSearch());
        document.getElementById('chatInfoBtn').addEventListener('click', () => this.toggleInfoPanel());
        document.getElementById('closeInfoPanel').addEventListener('click', () => this.toggleInfoPanel(false));

        // Message search
        document.getElementById('msgSearchInput').addEventListener('input', e => this.searchMessages(e.target.value));
        document.getElementById('closeMsgSearch').addEventListener('click', () => this.toggleMessageSearch(false));

        // Emoji picker
        document.getElementById('emojiBtn').addEventListener('click', e => {
            e.stopPropagation();
            this.toggleEmojiPicker();
        });
        document.getElementById('emojiSearch').addEventListener('input', e => this.searchEmoji(e.target.value));
        document.querySelectorAll('.emoji-cat').forEach(btn => {
            btn.addEventListener('click', e => {
                document.querySelectorAll('.emoji-cat').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentEmojiCat = e.currentTarget.dataset.cat;
                this.renderEmojiGrid(this.currentEmojiCat);
            });
        });

        // Close emoji picker on outside click
        document.addEventListener('click', e => {
            const picker = document.getElementById('emojiPicker');
            const btn = document.getElementById('emojiBtn');
            if (!picker.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                this.closeEmojiPicker();
            }
        });

        // Mobile sidebar
        document.getElementById('mobileSidebarBtn')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
    }

    /* --------------------------------------------------
       AUTH
    -------------------------------------------------- */
    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
            btn.setAttribute('aria-selected', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    togglePasswordVisibility(btn) {
        const input = btn.closest('.input-wrapper').querySelector('input');
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    updatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const fill = document.getElementById('strengthFill');
        const label = document.getElementById('strengthLabel');
        const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

        const idx = Math.max(0, score - 1);
        fill.style.width = `${(score / 5) * 100}%`;
        fill.style.background = colors[idx];
        label.textContent = labels[idx];
        label.style.color = colors[idx];
    }

    setButtonLoading(form, loading) {
        const submitBtn = form.querySelector('[type="submit"]');
        if (!submitBtn) return;
        const textEl = submitBtn.querySelector('.btn-text');
        const loaderEl = submitBtn.querySelector('.btn-loader');
        submitBtn.disabled = loading;
        if (textEl) textEl.classList.toggle('hidden', loading);
        if (loaderEl) loaderEl.classList.toggle('hidden', !loading);
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            return this.showToast('Please fill in all fields', 'warning');
        }

        this.setButtonLoading(form, true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('chatwave_token', this.token);
                localStorage.setItem('chatwave_user', JSON.stringify(this.currentUser));

                this.showChatScreen();
                this.connectSocket();
                this.showToast('Welcome back!', 'success');
            } else {
                this.showToast(data.error || 'Login failed', 'error');
            }
        } catch {
            this.showToast('Network error. Please try again.', 'error');
        } finally {
            this.setButtonLoading(form, false);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        if (!username || !email || !password) {
            return this.showToast('Please fill in all fields', 'warning');
        }
        if (password.length < 6) {
            return this.showToast('Password must be at least 6 characters', 'warning');
        }

        this.setButtonLoading(form, true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();

            if (res.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('chatwave_token', this.token);
                localStorage.setItem('chatwave_user', JSON.stringify(this.currentUser));

                this.showChatScreen();
                this.connectSocket();
                this.showToast(`Welcome, ${username}! 🎉`, 'success');
            } else {
                this.showToast(data.error || 'Registration failed', 'error');
            }
        } catch {
            this.showToast('Network error. Please try again.', 'error');
        } finally {
            this.setButtonLoading(form, false);
        }
    }

    logout() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.clearSession();
        this.currentChat = null;
        this.rooms = [];
        this.users = [];
        // Reset UI
        document.getElementById('roomsContainer').innerHTML = '';
        document.getElementById('usersContainer').innerHTML = '';
        document.getElementById('messagesContainer') && (document.getElementById('messagesContainer').innerHTML = '');
        this.showToast('Signed out successfully', 'info');
    }

    /* --------------------------------------------------
       SCREENS
    -------------------------------------------------- */
    showAuthScreen() {
        document.getElementById('authScreen').classList.add('active');
        document.getElementById('chatScreen').classList.remove('active');
    }

    showChatScreen() {
        document.getElementById('authScreen').classList.remove('active');
        document.getElementById('chatScreen').classList.add('active');

        if (this.currentUser) {
            const initials = this.getInitials(this.currentUser.username);
            document.getElementById('sidebarAvatar').textContent = initials;
            document.getElementById('sidebarUsername').textContent = this.currentUser.username;
            document.getElementById('sidebarStatus').innerHTML = '<span class="status-dot"></span> Online';
            document.getElementById('sidebarStatus').className = 'profile-status online';
        }
    }

    /* --------------------------------------------------
       SOCKET
    -------------------------------------------------- */
    connectSocket() {
        if (this.socket?.connected) return;

        this.socket = io({
            auth: { token: this.token },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        this.socket.on('connect', () => {
            console.log('🔗 Connected to ChatWave server');
            this.loadRooms();
            this.loadUsers();
        });

        this.socket.on('disconnect', () => {
            this.showToast('Connection lost. Reconnecting…', 'warning');
        });

        this.socket.on('reconnect', () => {
            this.showToast('Reconnected!', 'success');
            this.loadRooms();
            this.loadUsers();
        });

        this.socket.on('connect_error', err => {
            console.error('Socket error:', err.message);
            if (err.message === 'Authentication error') {
                this.clearSession();
                this.showToast('Session expired. Please sign in again.', 'error');
            }
        });

        this.socket.on('receive_message', msg => this.handleIncomingMessage(msg));
        this.socket.on('user_online', data => this.handleUserOnline(data));
        this.socket.on('user_offline', data => this.handleUserOffline(data));
        this.socket.on('user_typing', data => this.showTypingIndicator(data.username));
        this.socket.on('user_stop_typing', () => this.hideTypingIndicator());
    }

    /* --------------------------------------------------
       DATA LOADING
    -------------------------------------------------- */
    async loadRooms() {
        try {
            const res = await fetch('/api/rooms', {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            this.rooms = data.rooms || [];
            this.renderRooms();
        } catch {
            console.error('Failed to load rooms');
        }
    }

    async loadUsers() {
        try {
            const res = await fetch('/api/users', {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            this.users = data.users || [];
            this.renderUsers();
        } catch {
            console.error('Failed to load users');
        }
    }

    /* --------------------------------------------------
       RENDER
    -------------------------------------------------- */
    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
    }

    getAvatarColor(str) {
        const colors = [
            'linear-gradient(135deg,#667eea,#764ba2)',
            'linear-gradient(135deg,#f093fb,#f5576c)',
            'linear-gradient(135deg,#4facfe,#00f2fe)',
            'linear-gradient(135deg,#43e97b,#38f9d7)',
            'linear-gradient(135deg,#fa709a,#fee140)',
            'linear-gradient(135deg,#a18cd1,#fbc2eb)',
            'linear-gradient(135deg,#ffecd2,#fcb69f)',
            'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
        ];
        let hash = 0;
        for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        return colors[Math.abs(hash) % colors.length];
    }

    renderRooms(filter = '') {
        const container = document.getElementById('roomsContainer');
        const empty = document.getElementById('roomsEmpty');
        const lf = filter.toLowerCase();

        const filtered = this.rooms.filter(r =>
            r.name.toLowerCase().includes(lf) ||
            (r.description || '').toLowerCase().includes(lf)
        );

        container.innerHTML = '';

        if (!filtered.length) {
            empty.classList.remove('hidden');
            return;
        }
        empty.classList.add('hidden');

        filtered.forEach(room => {
            const el = document.createElement('div');
            el.className = 'list-item';
            el.setAttribute('role', 'listitem');
            if (this.currentChat?.type === 'room' && this.currentChat.id === room.id) {
                el.classList.add('active');
            }
            el.innerHTML = `
                <div class="item-avatar room-avatar" style="background:${this.getAvatarColor(room.name)}">
                    <i class="fas fa-hashtag" style="font-size:0.9rem"></i>
                </div>
                <div class="item-info">
                    <div class="item-name">${this.escapeHtml(room.name)}</div>
                    <div class="item-sub">${room.type}</div>
                </div>
                ${room.is_member ? '<span class="item-badge joined">Joined</span>' : '<span class="item-badge">Join</span>'}
            `;
            el.addEventListener('click', () => this.joinRoom(room));
            container.appendChild(el);
        });

        // Update badge
        document.getElementById('roomsBadge').textContent = this.rooms.length || '';
    }

    renderUsers(filter = '') {
        const container = document.getElementById('usersContainer');
        const empty = document.getElementById('usersEmpty');
        const lf = filter.toLowerCase();

        const filtered = this.users.filter(u => u.username.toLowerCase().includes(lf));

        container.innerHTML = '';

        if (!filtered.length) {
            empty.classList.remove('hidden');
            return;
        }
        empty.classList.add('hidden');

        const online = filtered.filter(u => u.status === 'online');
        const offline = filtered.filter(u => u.status !== 'online');

        const renderGroup = (list) => {
            list.forEach(user => {
                const el = document.createElement('div');
                el.className = 'list-item';
                el.setAttribute('role', 'listitem');
                el.id = `user-item-${user.id}`;
                if (this.currentChat?.type === 'private' && this.currentChat.id === user.id) {
                    el.classList.add('active');
                }
                el.innerHTML = `
                    <div class="item-avatar user-avatar" style="background:${this.getAvatarColor(user.username)}">
                        ${this.getInitials(user.username)}
                    </div>
                    <div class="item-info">
                        <div class="item-name">${this.escapeHtml(user.username)}</div>
                        <div class="item-sub">${user.status === 'online' ? '🟢 Online' : '⚫ Offline'}</div>
                    </div>
                    <div class="user-status-indicator ${user.status === 'online' ? 'online' : 'offline'}"></div>
                `;
                el.addEventListener('click', () => this.startPrivateChat(user));
                container.appendChild(el);
            });
        };

        renderGroup(online);
        renderGroup(offline);

        const onlineCount = online.length;
        document.getElementById('onlineBadge').textContent = onlineCount;
        document.getElementById('onlineCount').textContent = `${onlineCount} online`;
    }

    filterSidebarItems(value) {
        const activeTab = document.querySelector('.sidebar-tab.active')?.dataset.tab;
        if (activeTab === 'rooms') this.renderRooms(value);
        else if (activeTab === 'users') this.renderUsers(value);
    }

    /* --------------------------------------------------
       SIDEBAR TABS
    -------------------------------------------------- */
    switchSidebarTab(tab) {
        document.querySelectorAll('.sidebar-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.sidebar-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`${tab}List`).classList.add('active');
        document.getElementById('sidebarSearch').value = '';
        document.getElementById('sidebarSearch').placeholder = `Search ${tab}…`;
    }

    /* --------------------------------------------------
       ROOM / CHAT ACTIONS
    -------------------------------------------------- */
    async joinRoom(room) {
        if (!room.is_member) {
            try {
                const res = await fetch(`/api/rooms/${room.id}/join`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                if (res.ok) {
                    room.is_member = 1;
                    this.showToast(`Joined #${room.name}!`, 'success');
                    this.renderRooms();
                } else {
                    const d = await res.json();
                    this.showToast(d.error || 'Failed to join room', 'error');
                    return;
                }
            } catch {
                this.showToast('Network error', 'error');
                return;
            }
        }
        this.openRoom(room);
    }

    openRoom(room) {
        this.currentChat = { type: 'room', id: room.id, name: room.name, description: room.description, roomType: room.type };
        this.msgCount = 0;

        this.setActiveListItem('room', room.id);
        this.showChatContent();

        document.getElementById('chatHeaderAvatar').innerHTML = '<i class="fas fa-hashtag" style="font-size:0.9rem"></i>';
        document.getElementById('chatTitle').textContent = room.name;
        document.getElementById('chatParticipants').textContent = `${room.type} room`;

        this.socket.emit('join_room', room.id);
        this.loadRoomMessages(room.id);

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('mobile-open');
    }

    startPrivateChat(user) {
        this.currentChat = { type: 'private', id: user.id, name: user.username, status: user.status };
        this.msgCount = 0;

        this.setActiveListItem('private', user.id);
        this.showChatContent();

        document.getElementById('chatHeaderAvatar').textContent = this.getInitials(user.username);
        document.getElementById('chatHeaderAvatar').style.background = this.getAvatarColor(user.username);
        document.getElementById('chatTitle').textContent = user.username;
        document.getElementById('chatParticipants').textContent =
            user.status === 'online' ? '🟢 Online' : 'Private conversation';

        this.loadPrivateMessages(user.id);

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('mobile-open');
    }

    setActiveListItem(type, id) {
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('active'));
        // Find by matching
        document.querySelectorAll('.list-item').forEach(el => {
            // Re-render to reflect active state
        });
        // Re-render lists to mark active
        this.renderRooms(document.getElementById('sidebarSearch').value);
        this.renderUsers(document.getElementById('sidebarSearch').value);
    }

    showChatContent() {
        document.getElementById('welcomeMessage').classList.add('hidden');
        document.getElementById('chatContent').classList.remove('hidden');
        this.closeInfoPanel();
    }

    /* --------------------------------------------------
       MESSAGES
    -------------------------------------------------- */
    async loadRoomMessages(roomId) {
        this.showMessagesLoading(true);
        try {
            const res = await fetch(`/api/messages/room/${roomId}`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                this.renderMessages(data.messages);
                this.msgCount = data.messages.length;
            }
        } catch {
            console.error('Failed to load room messages');
        } finally {
            this.showMessagesLoading(false);
        }
    }

    async loadPrivateMessages(userId) {
        this.showMessagesLoading(true);
        try {
            const res = await fetch(`/api/messages/private/${userId}`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                this.renderMessages(data.messages);
                this.msgCount = data.messages.length;
            }
        } catch {
            console.error('Failed to load private messages');
        } finally {
            this.showMessagesLoading(false);
        }
    }

    showMessagesLoading(show) {
        const loader = document.getElementById('messagesLoading');
        if (show) {
            document.getElementById('messagesContainer').innerHTML = '';
            document.getElementById('messagesContainer').appendChild(loader);
            loader.classList.remove('hidden');
        } else {
            loader.classList.add('hidden');
        }
    }

    renderMessages(messages) {
        const container = document.getElementById('messagesContainer');
        container.innerHTML = '';

        let lastSender = null;
        let lastDate = null;

        messages.forEach((msg, i) => {
            const msgDate = new Date(msg.created_at).toDateString();
            if (msgDate !== lastDate) {
                container.appendChild(this.createDateSeparator(new Date(msg.created_at)));
                lastDate = msgDate;
                lastSender = null;
            }

            const grouped = lastSender === msg.sender_id;
            container.appendChild(this.createMessageElement(msg, grouped));
            lastSender = msg.sender_id;
        });

        container.scrollTop = container.scrollHeight;
    }

    createDateSeparator(date) {
        const el = document.createElement('div');
        el.className = 'date-separator';
        const label = this.formatDateLabel(date);
        el.innerHTML = `<span>${label}</span>`;
        return el;
    }

    formatDateLabel(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    createMessageElement(msg, grouped = false) {
        const isOwn = msg.sender_id === this.currentUser?.id;
        const el = document.createElement('div');
        el.className = `message ${isOwn ? 'own' : ''} ${grouped ? 'grouped' : 'new-sender'}`;
        el.dataset.msgId = msg.id;

        const initials = isOwn ? this.getInitials(this.currentUser.username) : this.getInitials(msg.username);
        const senderColor = isOwn ? '' : `style="background:${this.getAvatarColor(msg.username || '?')}"`;

        el.innerHTML = `
            <div class="msg-avatar" ${isOwn ? '' : senderColor}>${initials}</div>
            <div class="msg-body">
                ${!isOwn && !grouped ? `<div class="msg-sender">${this.escapeHtml(msg.username || 'Unknown')}</div>` : ''}
                <div class="msg-bubble">
                    <div class="msg-text">${this.formatMessageContent(msg.content)}</div>
                </div>
                <div class="msg-meta">
                    <span class="msg-time">${this.formatTime(msg.created_at)}</span>
                    ${isOwn ? '<i class="fas fa-check" style="font-size:0.65rem;color:rgba(255,255,255,0.45)"></i>' : ''}
                </div>
            </div>
        `;
        return el;
    }

    formatMessageContent(content) {
        // Escape HTML first, then apply formatting
        let text = this.escapeHtml(content);
        // URLs
        text = text.replace(
            /(https?:\/\/[^\s<>"]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline">$1</a>'
        );
        // Bold **text**
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Italic *text*
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        // Code `text`
        text = text.replace(/`(.+?)`/g, '<code style="background:rgba(0,0,0,0.2);padding:0.1em 0.4em;border-radius:4px;font-size:0.875em">$1</code>');
        return text;
    }

    handleIncomingMessage(msg) {
        const relevantChat = (
            (this.currentChat?.type === 'room' && msg.room_id === this.currentChat.id) ||
            (this.currentChat?.type === 'private' &&
                (msg.sender_id === this.currentChat.id || msg.recipient_id === this.currentChat.id))
        );

        if (relevantChat) {
            const container = document.getElementById('messagesContainer');
            const lastMsg = container.querySelector('.message:last-of-type');
            const lastSender = lastMsg?.dataset?.senderId;
            const grouped = lastSender === msg.sender_id && msg.sender_id !== this.currentUser?.id;

            // Add date separator if needed
            const lastSep = container.querySelector('.date-separator:last-of-type');
            const today = new Date().toDateString();
            if (!lastSep || lastSep.nextElementSibling === null ||
                new Date(msg.created_at).toDateString() !== today) {
                // Only add if it's a new day
            }

            const el = this.createMessageElement(msg, grouped);
            container.appendChild(el);
            container.scrollTop = container.scrollHeight;
            this.msgCount++;

            // Update info panel count
            document.getElementById('infoPanelMsgCount').textContent = this.msgCount;
        }

        this.hideTypingIndicator();
    }

    /* --------------------------------------------------
       SEND MESSAGE
    -------------------------------------------------- */
    sendMessage() {
        const input = document.getElementById('messageInput');
        const content = input.value.trim();
        if (!content || !this.currentChat) return;

        const payload = { content, type: 'text' };
        if (this.currentChat.type === 'room') {
            payload.room_id = this.currentChat.id;
        } else {
            payload.recipient_id = this.currentChat.id;
        }

        this.socket.emit('send_message', payload);
        input.value = '';
        this.autoResizeTextarea();
        this.handleTypingStop();
        this.closeEmojiPicker();
    }

    handleMessageKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    autoResizeTextarea() {
        const ta = document.getElementById('messageInput');
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 140) + 'px';
    }

    /* --------------------------------------------------
       TYPING INDICATORS
    -------------------------------------------------- */
    handleTypingStart() {
        if (!this.currentChat || !this.socket) return;

        if (!this.isTyping) {
            this.isTyping = true;
            const payload = this.currentChat.type === 'room'
                ? { room_id: this.currentChat.id }
                : { recipient_id: this.currentChat.id };
            this.socket.emit('typing', payload);
        }

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.handleTypingStop(), 2500);
    }

    handleTypingStop() {
        clearTimeout(this.typingTimer);
        if (!this.isTyping || !this.socket) return;
        this.isTyping = false;
        const payload = this.currentChat?.type === 'room'
            ? { room_id: this.currentChat.id }
            : { recipient_id: this.currentChat?.id };
        this.socket.emit('stop_typing', payload);
    }

    showTypingIndicator(username) {
        const indicator = document.getElementById('typingIndicator');
        document.getElementById('typingText').textContent = `${username} is typing…`;
        indicator.classList.remove('hidden');
    }

    hideTypingIndicator() {
        document.getElementById('typingIndicator').classList.add('hidden');
    }

    /* --------------------------------------------------
       USER STATUS
    -------------------------------------------------- */
    handleUserOnline(data) {
        const user = this.users.find(u => u.id === data.userId);
        if (user) {
            user.status = 'online';
            this.renderUsers();
        }
        // Update current private chat header
        if (this.currentChat?.type === 'private' && this.currentChat.id === data.userId) {
            document.getElementById('chatParticipants').textContent = '🟢 Online';
        }
    }

    handleUserOffline(data) {
        const user = this.users.find(u => u.id === data.userId);
        if (user) {
            user.status = 'offline';
            this.renderUsers();
        }
        if (this.currentChat?.type === 'private' && this.currentChat.id === data.userId) {
            document.getElementById('chatParticipants').textContent = '⚫ Offline';
        }
    }

    /* --------------------------------------------------
       CREATE ROOM
    -------------------------------------------------- */
    showCreateRoomModal() {
        document.getElementById('createRoomModal').classList.add('active');
        document.getElementById('roomName').focus();
    }

    hideCreateRoomModal() {
        document.getElementById('createRoomModal').classList.remove('active');
        document.getElementById('createRoomForm').reset();
        document.getElementById('descCharCount').textContent = '0 / 200';
    }

    async handleCreateRoom(e) {
        e.preventDefault();
        const name = document.getElementById('roomName').value.trim();
        const description = document.getElementById('roomDescription').value.trim();
        const type = document.querySelector('input[name="roomType"]:checked')?.value || 'public';

        if (!name) return this.showToast('Room name is required', 'warning');

        const submitBtn = document.getElementById('createRoomSubmitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating…';

        try {
            const res = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ name, description, type })
            });
            const data = await res.json();

            if (res.ok) {
                this.rooms.unshift({ ...data.room, is_member: 1 });
                this.renderRooms();
                this.hideCreateRoomModal();
                this.showToast(`#${name} created!`, 'success');
                // Open the new room
                this.openRoom(data.room);
            } else {
                this.showToast(data.error || 'Failed to create room', 'error');
            }
        } catch {
            this.showToast('Network error', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-plus"></i> Create Room';
        }
    }

    /* --------------------------------------------------
       EMOJI PICKER
    -------------------------------------------------- */
    toggleEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        if (this.emojiPickerOpen) {
            this.closeEmojiPicker();
        } else {
            picker.classList.remove('hidden');
            this.emojiPickerOpen = true;
            setTimeout(() => document.getElementById('emojiSearch').focus(), 50);
        }
    }

    closeEmojiPicker() {
        document.getElementById('emojiPicker').classList.add('hidden');
        this.emojiPickerOpen = false;
    }

    renderEmojiGrid(cat, filter = '') {
        const grid = document.getElementById('emojiGrid');
        grid.innerHTML = '';

        let emojis = EMOJI_DATA[cat] || [];
        if (filter) {
            // Search across all categories
            emojis = Object.values(EMOJI_DATA).flat().filter(e => {
                // Simple filter — could use emoji names if available
                return true; // all emojis show when searching
            });
        }

        emojis.slice(0, 64).forEach(emoji => {
            const btn = document.createElement('button');
            btn.className = 'emoji-btn';
            btn.textContent = emoji;
            btn.title = emoji;
            btn.addEventListener('click', () => {
                const input = document.getElementById('messageInput');
                const start = input.selectionStart;
                const end = input.selectionEnd;
                input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
                input.setSelectionRange(start + emoji.length, start + emoji.length);
                input.focus();
            });
            grid.appendChild(btn);
        });
    }

    searchEmoji(query) {
        if (!query.trim()) {
            this.renderEmojiGrid(this.currentEmojiCat);
            return;
        }
        // Show all emojis when searching
        const grid = document.getElementById('emojiGrid');
        grid.innerHTML = '';
        const all = Object.values(EMOJI_DATA).flat();
        all.slice(0, 64).forEach(emoji => {
            const btn = document.createElement('button');
            btn.className = 'emoji-btn';
            btn.textContent = emoji;
            btn.addEventListener('click', () => {
                const input = document.getElementById('messageInput');
                input.value += emoji;
                input.focus();
            });
            grid.appendChild(btn);
        });
    }

    /* --------------------------------------------------
       MESSAGE SEARCH
    -------------------------------------------------- */
    toggleMessageSearch(show = null) {
        const bar = document.getElementById('msgSearchBar');
        const isHidden = bar.classList.contains('hidden');
        const shouldShow = show === null ? isHidden : show;

        if (shouldShow) {
            bar.classList.remove('hidden');
            document.getElementById('msgSearchInput').focus();
        } else {
            bar.classList.add('hidden');
            document.getElementById('msgSearchInput').value = '';
            // Clear highlight
            document.querySelectorAll('.msg-text mark').forEach(m => {
                m.outerHTML = m.textContent;
            });
        }
    }

    searchMessages(query) {
        const messages = document.querySelectorAll('.msg-text');
        messages.forEach(el => {
            const text = el.dataset.rawText || el.textContent;
            el.dataset.rawText = text;

            if (!query.trim()) {
                el.innerHTML = text;
                el.closest('.message')?.style.removeProperty('opacity');
                return;
            }

            const lq = query.toLowerCase();
            const lt = text.toLowerCase();
            const idx = lt.indexOf(lq);

            if (idx === -1) {
                el.closest('.message') && (el.closest('.message').style.opacity = '0.3');
            } else {
                el.closest('.message')?.style.removeProperty('opacity');
                el.innerHTML = text.slice(0, idx) + `<mark style="background:rgba(255,215,0,0.4);border-radius:2px;padding:0 2px">${text.slice(idx, idx + query.length)}</mark>` + text.slice(idx + query.length);
            }
        });
    }

    /* --------------------------------------------------
       INFO PANEL
    -------------------------------------------------- */
    toggleInfoPanel(show = null) {
        const panel = document.getElementById('infoPanel');
        const isHidden = panel.classList.contains('hidden');
        const shouldShow = show === null ? isHidden : show;

        if (shouldShow && this.currentChat) {
            panel.classList.remove('hidden');
            this.populateInfoPanel();
        } else {
            panel.classList.add('hidden');
        }
    }

    closeInfoPanel() {
        document.getElementById('infoPanel').classList.add('hidden');
    }

    populateInfoPanel() {
        const chat = this.currentChat;
        if (!chat) return;

        if (chat.type === 'room') {
            document.getElementById('infoPanelAvatar').innerHTML = '<i class="fas fa-hashtag"></i>';
            document.getElementById('infoPanelName').textContent = chat.name;
            document.getElementById('infoPanelSub').textContent = `${chat.roomType || 'public'} room`;
            document.getElementById('infoPanelDesc').textContent = chat.description || 'No description provided.';
            document.getElementById('infoPanelMsgCount').textContent = this.msgCount;
            document.getElementById('infoPanelMemberCount').textContent = '—';
        } else {
            const user = this.users.find(u => u.id === chat.id);
            document.getElementById('infoPanelAvatar').textContent = this.getInitials(chat.name);
            document.getElementById('infoPanelAvatar').style.background = this.getAvatarColor(chat.name);
            document.getElementById('infoPanelName').textContent = chat.name;
            document.getElementById('infoPanelSub').textContent = user?.status === 'online' ? '🟢 Online' : '⚫ Offline';
            document.getElementById('infoPanelDesc').textContent = 'Private conversation';
            document.getElementById('infoPanelMsgCount').textContent = this.msgCount;
            document.getElementById('infoPanelMemberCount').textContent = '2';
        }
    }

    /* --------------------------------------------------
       UTILITIES
    -------------------------------------------------- */
    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    showToast(message, type = 'info', title = '') {
        const container = document.getElementById('toastContainer');
        const icons = { success: 'check-circle', error: 'times-circle', info: 'info-circle', warning: 'exclamation-triangle' };
        const titles = { success: 'Success', error: 'Error', info: 'Info', warning: 'Warning' };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="toast-icon fas fa-${icons[type] || 'info-circle'}"></i>
            <div class="toast-body">
                <div class="toast-title">${title || titles[type]}</div>
                <div class="toast-msg">${this.escapeHtml(message)}</div>
            </div>
            <button class="toast-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => this.removeToast(toast));
        container.appendChild(toast);

        setTimeout(() => this.removeToast(toast), 4000);
    }

    removeToast(toast) {
        if (!toast.parentElement) return;
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }
}

/* ======================================================
   BOOT
   ====================================================== */
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
});
