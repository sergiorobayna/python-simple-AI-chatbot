document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const welcomeScreen = document.getElementById('welcome-screen');
    const messagesList = document.getElementById('messages-list');
    const thinkingIndicator = document.getElementById('thinking-indicator');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const clearBtn = document.getElementById('clear-btn');

    let isSending = false;

    function appendMessage(msg) {
        const isUser = msg.role === 'user';
        const item = document.createElement('div');
        item.className = `message-item ${isUser ? 'user' : 'assistant'}`;
        
        item.innerHTML = `
            <div class="message-content-wrapper">
                <div class="avatar ${isUser ? 'user-avatar' : 'assistant-avatar'}">
                    <span class="${isUser ? 'user' : 'assistant'}-avatar-shape"></span>
                </div>
                <div class="message-text">${msg.content}</div>
            </div>
        `;
        
        messagesList.appendChild(item);
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        sendBtn.disabled = !chatInput.value.trim() || isSending;
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (!sendBtn.disabled) {
                chatForm.requestSubmit();
            } 
        }
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = chatInput.value.trim();
        if (!content || isSending) return;

        isSending = true;
        sendBtn.disabled = true;
        chatInput.disabled = true;
        
        welcomeScreen.style.display = 'none';
        clearBtn.style.display = 'flex';
        appendMessage({ role: 'user', content });
        scrollToBottom();
        
        chatInput.value = '';
        chatInput.style.height = 'auto';

        thinkingIndicator.style.display = 'flex';
        scrollToBottom();
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        themeIcon.className = `theme-shape moon`;
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        const iconName = isDark ? 'sun' : 'moon';
        themeIcon.className = `theme-shape ${iconName}`;
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});
