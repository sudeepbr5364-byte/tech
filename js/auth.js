// Local Authentication (client-only, stores users in localStorage)
class AuthManager {
    constructor() {
        this.usersKey = 'ms_users'; // stores users map by email
        this.sessionKey = 'ms_session'; // stores current logged-in email
        this._ensureStorage();
        this._renderModal();
        this._bindGlobal();
        // expose
        window.Auth = this;
    }

    _ensureStorage() {
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify({}));
        }
    }

    async _hash(password) {
        const enc = new TextEncoder();
        const data = enc.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
    }

    _renderModal() {
        // Create modal DOM and append to body
        if (document.getElementById('ms-auth-modal')) return;
        const div = document.createElement('div');
        div.id = 'ms-auth-modal';
        div.innerHTML = `
            <div class="ms-modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:9999;">
                <div class="ms-modal" role="dialog" aria-modal="true" style="background:#fff;padding:20px;max-width:420px;border-radius:8px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.2)">
                    <button class="ms-close" aria-label="Close" style="float:right;background:none;border:none;font-size:18px;">✕</button>
                    <h3 style="margin-top:0">Sign in to Mastersolis</h3>
                    <div style="display:flex;gap:8px;margin-bottom:12px;">
                        <button id="ms-google" class="btn" style="flex:1">Continue with Google</button>
                    </div>
                    <hr />
                    <div>
                        <form id="ms-signin-form" style="display:grid;gap:8px;margin-top:8px;">
                            <input id="ms-signin-email" type="email" placeholder="Email" required style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
                            <input id="ms-signin-password" type="password" placeholder="Password" required style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
                            <div style="display:flex;gap:8px;align-items:center;">
                                <button id="ms-signin" class="btn btn-primary" type="button">Sign In</button>
                                <button id="ms-show-signup" class="btn" type="button">Create account</button>
                            </div>
                        </form>

                        <form id="ms-signup-form" style="display:none;gap:8px;margin-top:8px;">
                            <input id="ms-signup-name" type="text" placeholder="Full name" required style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
                            <input id="ms-signup-email" type="email" placeholder="Email" required style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
                            <input id="ms-signup-password" type="password" placeholder="Password" required style="padding:8px;border:1px solid #ddd;border-radius:4px;" />
                            <div style="display:flex;gap:8px;">
                                <button id="ms-signup" class="btn btn-primary" type="button">Create account</button>
                                <button id="ms-show-signin" class="btn" type="button">Back to sign in</button>
                            </div>
                        </form>
                    </div>
                    <p id="ms-auth-msg" style="color:#b91c1c;margin-top:8px;display:none"></p>
                </div>
            </div>
        `;
        document.body.appendChild(div);
        this.backdrop = div.querySelector('.ms-modal-backdrop');
        // Cache elements
        this._cache = {
            googleBtn: document.getElementById('ms-google'),
            signinForm: document.getElementById('ms-signin-form'),
            signupForm: document.getElementById('ms-signup-form'),
            signinBtn: document.getElementById('ms-signin'),
            signupBtn: document.getElementById('ms-signup'),
            showSignup: document.getElementById('ms-show-signup'),
            showSignin: document.getElementById('ms-show-signin'),
            closeBtn: div.querySelector('.ms-close'),
            msg: document.getElementById('ms-auth-msg')
        };
    }

    _bindGlobal() {
        // Bind openers if getStartedBtn exists
        const gs = document.getElementById('getStartedBtn');
        if (gs) gs.addEventListener('click', () => this.open());

        // Bind modal controls
        if (!this._cache) return;
        this._cache.googleBtn.addEventListener('click', () => this._googleSignIn());
        this._cache.showSignup.addEventListener('click', () => this._toggleForms('signup'));
        this._cache.showSignin.addEventListener('click', () => this._toggleForms('signin'));
        this._cache.closeBtn.addEventListener('click', () => this.close());
        this._cache.signinBtn.addEventListener('click', () => this._handleSignIn());
        this._cache.signupBtn.addEventListener('click', () => this._handleSignUp());

        // close on backdrop click
        this.backdrop.addEventListener('click', (e) => { if (e.target === this.backdrop) this.close(); });
        // Render header user area
        this._renderHeaderUserArea();
        // Update header area on auth changes
        document.addEventListener('ms-auth-changed', () => this._updateHeaderUserArea());
    }

    _renderHeaderUserArea() {
        // inject a small user area into the navbar if present
        const nav = document.querySelector('.navbar');
        if (!nav) return;
        if (document.getElementById('ms-user-area')) return;
        const wrapper = document.createElement('div');
        wrapper.id = 'ms-user-area';
        wrapper.style.marginLeft = '12px';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.innerHTML = `
            <span id="ms-user-greeting" style="margin-right:8px; font-size:0.95rem;"></span>
            <button id="ms-user-action" class="btn" style="padding:6px 10px;"></button>
        `;
        nav.appendChild(wrapper);
        // Bind click
        document.getElementById('ms-user-action').addEventListener('click', (e) => {
            const auth = this;
            if (!auth.isLoggedIn()) {
                auth.open();
            } else {
                // sign out
                auth.signOut();
            }
        });
        // initial update
        this._updateHeaderUserArea();
    }

    _updateHeaderUserArea() {
        const greeting = document.getElementById('ms-user-greeting');
        const action = document.getElementById('ms-user-action');
        if (!greeting || !action) return;
        const user = this.getCurrentUser();
        if (user) {
            const name = user.name || user.email.split('@')[0];
            greeting.textContent = `Hello, ${name}`;
            action.textContent = 'Sign out';
            action.classList.remove('btn-primary');
        } else {
            greeting.textContent = '';
            action.textContent = 'Sign in';
            action.classList.add('btn-primary');
        }
    }

    _toggleForms(which) {
        if (which === 'signup') {
            this._cache.signinForm.style.display = 'none';
            this._cache.signupForm.style.display = 'grid';
            this._cache.msg.style.display = 'none';
        } else {
            this._cache.signinForm.style.display = 'grid';
            this._cache.signupForm.style.display = 'none';
            this._cache.msg.style.display = 'none';
        }
    }

    open() {
        this.backdrop.style.display = 'flex';
    }

    close() {
        this.backdrop.style.display = 'none';
    }

    _showMessage(text) {
        this._cache.msg.textContent = text;
        this._cache.msg.style.display = 'block';
    }

    async _handleSignUp() {
        const name = document.getElementById('ms-signup-name').value.trim();
        const email = document.getElementById('ms-signup-email').value.trim().toLowerCase();
        const password = document.getElementById('ms-signup-password').value;
        if (!name || !email || !password) { this._showMessage('Please fill all signup fields.'); return; }
        const users = JSON.parse(localStorage.getItem(this.usersKey) || '{}');
        if (users[email]) { this._showMessage('Account already exists. Please sign in.'); return; }
        const passHash = await this._hash(password);
        users[email] = { email, name, passHash, provider: 'local' };
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        localStorage.setItem(this.sessionKey, email);
        this._dispatchChange();
        this.close();
    }

    async _handleSignIn() {
        const email = document.getElementById('ms-signin-email').value.trim().toLowerCase();
        const password = document.getElementById('ms-signin-password').value;
        if (!email || !password) { this._showMessage('Please provide email and password.'); return; }
        const users = JSON.parse(localStorage.getItem(this.usersKey) || '{}');
        const user = users[email];
        if (!user) { this._showMessage('No account found for this email.'); return; }
        if (user.provider !== 'local') { this._showMessage('Please sign in with Google.'); return; }
        const passHash = await this._hash(password);
        if (passHash !== user.passHash) { this._showMessage('Incorrect password.'); return; }
        localStorage.setItem(this.sessionKey, email);
        this._dispatchChange();
        this.close();
    }

    async _googleSignIn() {
        // Simulated Google flow: ask for email, create account if missing
        const email = prompt('Simulated Google sign-in — enter your Google email:');
        if (!email) return;
        const e = email.trim().toLowerCase();
        const users = JSON.parse(localStorage.getItem(this.usersKey) || '{}');
        if (!users[e]) {
            users[e] = { email: e, name: e.split('@')[0], provider: 'google' };
            localStorage.setItem(this.usersKey, JSON.stringify(users));
        }
        localStorage.setItem(this.sessionKey, e);
        this._dispatchChange();
        this.close();
    }

    signOut() {
        localStorage.removeItem(this.sessionKey);
        this._dispatchChange();
    }

    getCurrentUser() {
        const email = localStorage.getItem(this.sessionKey);
        if (!email) return null;
        const users = JSON.parse(localStorage.getItem(this.usersKey) || '{}');
        return users[email] || { email };
    }

    isLoggedIn() {
        return !!localStorage.getItem(this.sessionKey);
    }

    _dispatchChange() {
        const evt = new CustomEvent('ms-auth-changed', { detail: { user: this.getCurrentUser() } });
        document.dispatchEvent(evt);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    new AuthManager();
});
