// Admin Dashboard
class AdminDashboard {
    constructor() {
        this.isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
        this.init();
    }

    init() {
        if (window.location.pathname.includes('login.html')) {
            this.setupLogin();
        } else if (window.location.pathname.includes('dashboard.html')) {
            this.checkAuth();
            this.setupDashboard();
        }
    }

    setupLogin() {
        const loginForm = document.getElementById('adminLoginForm');
        const messageDiv = document.getElementById('loginMessage');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const username = document.getElementById('adminUsername').value;
                const password = document.getElementById('adminPassword').value;

                // Simple authentication (in real app, this would be server-side)
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('adminAuthenticated', 'true');
                    window.location.href = 'dashboard.html';
                } else {
                    messageDiv.innerHTML = '<p style="color: var(--error);">Invalid credentials. Try admin/admin123</p>';
                }
            });
        }
    }

    checkAuth() {
        if (!this.isAuthenticated) {
            window.location.href = 'login.html';
        }
    }

    setupDashboard() {
        this.loadAnalytics();
        this.loadContactSubmissions();
        this.loadAIEmails();
        this.setupLogout();
    }

    loadAnalytics() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const emails = JSON.parse(localStorage.getItem('aiEmails') || '[]');
        
        // Update stats
        document.getElementById('totalSubmissions').textContent = submissions.length;
        document.getElementById('totalEmails').textContent = emails.length;
        document.getElementById('servicesBreakdown').textContent = this.getServicesBreakdown(submissions);
        
        // Generate AI summary
        this.generateAISummary(submissions);
    }

    getServicesBreakdown(submissions) {
        const breakdown = {};
        submissions.forEach(sub => {
            breakdown[sub.service] = (breakdown[sub.service] || 0) + 1;
        });
        
        return Object.entries(breakdown)
            .map(([service, count]) => `${service}: ${count}`)
            .join(', ');
    }

    generateAISummary(submissions) {
        const summaryElement = document.getElementById('aiSummary');
        if (!summaryElement) return;

        const total = submissions.length;
        const recent = submissions.filter(sub => {
            const subDate = new Date(sub.timestamp);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return subDate > weekAgo;
        }).length;

        const services = submissions.reduce((acc, sub) => {
            acc[sub.service] = (acc[sub.service] || 0) + 1;
            return acc;
        }, {});

        const popularService = Object.entries(services).sort((a, b) => b[1] - a[1])[0];

        const summary = `
            <h4>AI-Generated Analytics Summary</h4>
            <p><strong>Overview:</strong> You've received ${total} contact form submissions total, with ${recent} in the last 7 days.</p>
            <p><strong>Trend:</strong> ${recent > total * 0.3 ? 'Growing interest' : 'Steady traffic'} in your services.</p>
            <p><strong>Popular Service:</strong> ${popularService ? `${popularService[0]} (${popularService[1]} inquiries)` : 'No data yet'}</p>
            <p><strong>Recommendation:</strong> Consider creating more content about your ${popularService ? popularService[0] : 'AI'} services, as it's generating the most interest.</p>
        `;

        summaryElement.innerHTML = summary;
    }

    loadContactSubmissions() {
        const container = document.getElementById('submissionsList');
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        
        if (container) {
            container.innerHTML = submissions.map((sub, index) => `
                <div class="submission-item">
                    <h4>${sub.name} - ${sub.service}</h4>
                    <p><strong>Subject:</strong> ${sub.subject}</p>
                    <p><strong>Message:</strong> ${sub.message}</p>
                    <p><strong>Email:</strong> ${sub.email}</p>
                    <p><strong>Date:</strong> ${new Date(sub.timestamp).toLocaleDateString()}</p>
                    ${index < submissions.length - 1 ? '<hr>' : ''}
                </div>
            `).join('') || '<p>No submissions yet.</p>';
        }
    }

    loadAIEmails() {
        const container = document.getElementById('emailsList');
        const emails = JSON.parse(localStorage.getItem('aiEmails') || '[]');
        
        if (container) {
            container.innerHTML = emails.map((email, index) => `
                <div class="email-item">
                    <h4>To: ${email.to}</h4>
                    <p><strong>Subject:</strong> ${email.subject}</p>
                    <p><strong>Content:</strong> ${email.content.replace(/\n/g, '<br>')}</p>
                    <p><strong>Sent:</strong> ${new Date(email.timestamp).toLocaleString()}</p>
                    ${index < emails.length - 1 ? '<hr>' : ''}
                </div>
            `).join('') || '<p>No AI emails sent yet.</p>';
        }
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('adminAuthenticated');
                window.location.href = 'login.html';
            });
        }
    }
}

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    new AdminDashboard();
});