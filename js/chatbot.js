// AI Chatbot Implementation
class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.initialized = false;
        this.init();
    }

    init() {
        // If user not logged in, make toggle open auth modal and don't initialize full chatbot
        const session = localStorage.getItem('ms_session');
        if (!session) {
            const toggle = document.querySelector('.chatbot-toggle');
            if (toggle) {
                toggle.addEventListener('click', () => {
                    if (window.Auth && typeof window.Auth.open === 'function') {
                        window.Auth.open();
                    } else {
                        alert('Please sign in to use the chatbot.');
                    }
                });
                toggle.title = 'Sign in to chat';
            }

            // Listen for auth change to initialize chatbot when user signs in
            document.addEventListener('ms-auth-changed', () => {
                if (!this.initialized && localStorage.getItem('ms_session')) {
                    this.setupEventListeners();
                    this.loadChatHistory();
                    this.initialized = true;
                }
            });

            return;
        }

        this.setupEventListeners();
        this.loadChatHistory();
        this.initialized = true;
    }

    setupEventListeners() {
        const toggle = document.querySelector('.chatbot-toggle');
        const close = document.querySelector('.chatbot-close');
        const sendBtn = document.getElementById('sendMessage');
        const input = document.getElementById('chatbotInput');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }

        if (close) {
            close.addEventListener('click', () => this.closeChat());
        }

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    toggleChat() {
        const window = document.querySelector('.chatbot-window');
        window.classList.toggle('active');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            document.getElementById('chatbotInput').focus();
        }
    }

    closeChat() {
        const window = document.querySelector('.chatbot-window');
        window.classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Simulate AI thinking
        setTimeout(() => {
            this.generateAIResponse(message);
        }, 1000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const responses = {
            greetings: [
                "Hello! I'm your AI assistant from Mastersolis Infotech. How can I help you with our services today?",
                "Hi there! I'm here to assist you with information about our AI-powered solutions.",
                "Welcome! I'm your AI guide to Mastersolis Infotech's services and solutions."
            ],
            services: {
                ai: "Our AI solutions include machine learning models, natural language processing, computer vision, and predictive analytics. We help businesses automate processes and gain valuable insights from their data.",
                web: "We develop responsive, high-performance web applications using modern technologies like React, Vue.js, and Node.js. Our solutions are scalable, secure, and user-friendly.",
                mobile: "Our mobile app development services cover both iOS and Android platforms. We create intuitive, feature-rich applications with excellent user experiences.",
                cloud: "We provide comprehensive cloud solutions including migration, architecture design, and optimization on platforms like AWS, Azure, and Google Cloud."
            },
            pricing: "Pricing depends on the scope and complexity of your project. Would you like to schedule a free consultation with our experts to discuss your specific needs?",
            contact: "You can reach us at info@mastersolisinfotech.com or call +91 98765 43210. Our office is located at 123 Tech Park, Bangalore.",
            default: "I understand you're interested in our services. Could you provide more details about what you're looking for so I can assist you better?"
        };

        let response = responses.default;

        // Simple intent recognition
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        } else if (message.includes('ai') || message.includes('artificial intelligence')) {
            response = responses.services.ai;
        } else if (message.includes('web') || message.includes('website')) {
            response = responses.services.web;
        } else if (message.includes('mobile') || message.includes('app')) {
            response = responses.services.mobile;
        } else if (message.includes('cloud')) {
            response = responses.services.cloud;
        } else if (message.includes('price') || message.includes('cost')) {
            response = responses.pricing;
        } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            response = responses.contact;
        } else if (message.includes('service') || message.includes('what do you do')) {
            response = "We offer AI solutions, web development, mobile app development, and cloud services. Which area are you most interested in?";
        }

        this.addMessage(response, 'bot');
    }

    loadChatHistory() {
        // In a real application, this would load from localStorage or a database
        const initialMessage = "Hello! I'm your AI assistant. How can I help you with our services today?";
        this.addMessage(initialMessage, 'bot');
    }
}

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', function() {
    new AIChatbot();
});