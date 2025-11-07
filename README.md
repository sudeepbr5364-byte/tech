# Mastersolis Infotech Website

A modern, AI-powered business website for Mastersolis Infotech, featuring dynamic content, local authentication, chatbot, contact form with database and email integration, and admin dashboard.

## Features

- **Dynamic Hero Section**: Rotating taglines and AI-generated hero content.
- **Service Listing**: AI-powered service descriptions and project showcases.
- **Projects Section**: Six projects from different fields, each with required skills.
- **Local Authentication**: Sign in/up via Gmail or password (client-side, localStorage).
- **Chatbot**: AI-powered chatbot available only to logged-in users.
- **Logout Option**: Header user area with sign-in/sign-out UI.
- **Contact Form**:
  - Stores submissions in a local SQLite database.
  - Sends AI-generated email responses using EmailJS (frontend integration).
  - Popup feedback for submission status.
- **Admin Dashboard**: Accessible via `/admin/login.html` and `/admin/dashboard.html`.
- **Rotating Images**: Hero section and featured technologies section display rotating images from the assets folder.

## Project Structure

```
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js           # General UI and navigation
│   ├── ai-content.js     # AI content generator and dynamic sections
│   ├── auth.js           # Local authentication logic
│   ├── chatbot.js        # AI chatbot logic
│   ├── contact.js        # Contact form logic
│   ├── projects.js       # Projects section logic
│   ├── admin.js          # Admin dashboard logic
│   └── script.js         # Miscellaneous scripts
├── assets/
│   ├── AI.avif
│   ├── web.avif
│   ├── mobile.avif
│   └── cloud.avif
├── mastersolis-website/
│   ├── about.html
│   ├── services.html
│   ├── projects.html
│   └── contacts.html
├── admin/
│   ├── login.html
│   └── dashboard.html
├── contacts.db           # SQLite database for contact submissions
├── package.json
└── README.md
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Backend**: Node.js (Express), SQLite3, CORS, body-parser
- **Email**: EmailJS (frontend integration)
- **Authentication**: LocalStorage-based, client-only
- **AI Features**: Simulated via JavaScript (no external AI API required)

## Setup Instructions

1. **Install Dependencies**
   ```sh
   npm install express body-parser sqlite3 nodemailer cors emailjs
   ```
2. **Run Backend (for contact form storage)**
   - Ensure you have a backend server (e.g., `server.js`) that exposes `/api/contact` and connects to `contacts.db`.
   - Start the server:
     ```sh
     node server.js
     ```
3. **Configure EmailJS**
   - Sign up at [EmailJS](https://www.emailjs.com/) and get your `USER_ID`, `SERVICE_ID`, and `TEMPLATE_ID`.
   - Update the frontend code in `contacts.html` to use your EmailJS credentials.

4. **Open the Website**
   - Open `index.html` in your browser for the main site.
   - Access admin features via `/admin/login.html` and `/admin/dashboard.html`.

## Usage Notes

- **Authentication**: All user data is stored locally in the browser. No server-side user management.
- **Chatbot**: Only available to logged-in users.
- **Contact Form**: Requires backend server for database storage and EmailJS for email responses.
- **Rotating Images**: Hero and featured technologies sections rotate images every 10 seconds.

## Customization

- Update taglines, services, and projects in the relevant JS files for your business needs.
- Add or replace images in the `assets/` folder for different visual themes.
- Modify CSS in `css/style.css` for branding and layout changes.

## License

This project is for educational and demonstration purposes. Commercial use requires proper review and security hardening.
