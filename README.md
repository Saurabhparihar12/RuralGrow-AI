# RuralGrow AI - Week 6: Authentication & Security Upgrade

An AI-assisted review helper and social media marketing generator designed to support rural micro-merchants, organic farmers, and cottage industries (like weavers and homestay hosts) in Uttarakhand. 

This release introduces comprehensive MERN stack authentication, passport-based Google OAuth, Zod request body validation, express-rate-limiting, Helmet secure headers, MongoDB query sanitization, and role-based route guards.

---

## 📁 Updated Project Directory Architecture
The application has been restructured to follow standard production MERN patterns:
```
├── backend/
│   ├── config/             # Passport.js strategy loaders (passport.js)
│   ├── controllers/        # Express route request controllers (authController, reviewController)
│   ├── data/               # Persistent adapters and fallback json tables (dbHelper.js, database.json)
│   ├── middleware/         # Security, validation, and auth guards (auth.js, security.js, validator.js)
│   ├── models/             # Mongoose DB schema definitions (User.js, Review.js, Caption.js, Shop.js)
│   ├── routes/             # REST routing groups (authRoutes.js, reviewRoutes.js, captionRoutes.js)
│   ├── server.js           # Server initializer mounting helmet, cors, and sanitizers
│   └── package.json        # Node configuration with zod, helmet, express-rate-limit, and passport
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI elements & custom cursors
│   │   │   └── layout/     # Session ProtectedRoute component wrappers
│   │   ├── context/        # Global AuthContext provider and theme toggles
│   │   ├── pages/          # Pages (Home, Login, Dashboard, Profile, AdminDashboard)
│   │   ├── App.jsx         # Client routing declaring route guards
│   │   └── main.jsx        # App mounting and wrapper contexts
│   └── package.json        # Client configuration with framer-motion and lucide icons
```

---

## 🔒 Security Implementations
We have integrated professional security frameworks to protect user transactions:
1. **Helmet HTTP Headers:** Secure headers configured using `helmet` middleware.
2. **NoSQL Query Sanitization:** Cleans req bodies of SQL/NoSQL operator inputs via `express-mongo-sanitize`.
3. **CORS Whitelisting:** Enforces cross-origin checks allowing only the client port (`http://localhost:5173`) in production.
4. **Input Verification:** Validates incoming registration/login bodies via **Zod** schema checkers.
5. **Rate Limiting:** Enforces maximum of 5 native registration/login attempts per 15 minutes to block brute-force attempts (returns standard HTTP status code `429 Too Many Requests`).

---

## 👥 Role-Based Permission Architecture
The platform defines four distinct user roles, locking down both UI screens and backend APIs:
* **Admin:** Unrestricted read/write. Authorized to view system logs, delete users, and access server telemetry.
* **Farmer:** Allowed to view agricultural review boards and write reviews.
* **Business Owner:** Full write access for review replies and marketing captions.
* **Guest (Default):** Read-only viewing permissions on dashboards.

---

## 🔌 API Documentation

### Native & Google Authentication Routes
* `POST /api/auth/register` (or `/signup`) — Registers a new user. Enforces Zod validation schemas. Hashes password with bcrypt (10-12 salt rounds). Returns a JWT token.
* `POST /api/auth/login` — Authenticates user credentials. Returns signed JWT token (valid for 7 days).
* `POST /api/auth/google-simulated` — Sandbox Google OAuth sign-in flow for local testing without Client IDs.
* `GET /api/auth/google` — Redirects browser to Google account consent screen.
* `GET /api/auth/google/callback` — Handles callback from Google, registers/finds user profile, signs JWT, and redirects back to the frontend dashboard.
* `GET /api/auth/profile` — (Protected) Fetches details of the active authenticated session owner.
* `GET /api/auth/admin/stats` — (Protected - Admin Only) Returns server memory, user list size, and review volume trends.

---

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ruralgrow
JWT_SECRET=your_super_secure_jwt_secret_key

# Google OAuth Credentials (Required for production OAuth)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

---

## 🚀 Local Installation & Setup

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```
*Server will output: `[Server] REST API successfully listening on port: 5000`*

### 2. Optional: Seed the MongoDB Atlas Database
If you connect your real cloud MongoDB database for the first time, seed it with our default dataset (Admin accounts, mock reviews, and captions) by running:
```bash
npm run seed
```

### 2. Start the Frontend Client
```bash
cd ../frontend
npm install
npm run dev
```
*Client interface will load at `http://localhost:5173`.*

---

## 📁 Week 6 Submission Packets
All required deliverables are compiled in the root workspace directory:
- **LMS ZIP Packet:** `W6_Submission_TBI-26100640.zip` (consolidating PDFs and collections).
- **Postman API Suite:** [`W6_AuthAPICollection_TBI-26100640.json`](W6_AuthAPICollection_TBI-26100640.json).
- **Flow Screenshots PDF:** [`W6_AuthFlowScreenshots_TBI-26100640.pdf`](W6_AuthFlowScreenshots_TBI-26100640.pdf).
