# RuralGrow AI - Week 7: Google Gemini AI Integration & UI Polish

An AI-assisted business advisory assistant, review composer, and social media marketing generator designed to support rural micro-merchants, organic farmers, and cottage industries (like weavers, apiarists, and homestay hosts) in Uttarakhand.

This release introduces native integration with **Google Gemini AI** (powered by the `gemini-1.5-flash` model), a premium glassmorphic chat interface, live response composers, and an automated offline simulation fallback engine to ensure 100% availability.

---

## 📁 Updated Project Directory Architecture
The application has been restructured to follow standard production MERN patterns:
```
├── backend/
│   ├── config/             # Passport.js strategy loaders (passport.js)
│   ├── controllers/        # Controllers (authController, reviewController, aiController)
│   ├── data/               # Persistent adapters and json files (dbHelper.js, database.json)
│   ├── middleware/         # Security, validation, and auth guards (auth.js, security.js, validator.js)
│   ├── models/             # Mongoose DB schema definitions (User.js, Review.js, Caption.js)
│   ├── routes/             # REST routing groups (authRoutes.js, reviewRoutes.js, captionRoutes.js, aiRoutes.js)
│   ├── server.js           # Server initializer mounting helmet, cors, and route paths
│   └── package.json        # Node configuration with @google/generative-ai and passport
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI elements & layouts (ProtectedRoute.jsx)
│   │   ├── context/        # Global AuthContext provider and theme toggles
│   │   ├── pages/          # Pages (Home, Login, Dashboard, Profile, AdminDashboard, AiAssistant)
│   │   ├── App.jsx         # Client routing declaring route guards
│   │   └── main.jsx        # App mounting and wrapper contexts
│   └── package.json        # Client configuration with framer-motion and lucide icons
```

---

## 🤖 Week 7 AI Implementations

We have introduced three powerful, localized AI utilities designed to empower rural growers:
1.  **HimalayaGrow AI Assistant Chat (`/ai-assistant`):** A premium, glassmorphic conversational interface offering step-by-step agricultural guides, crop rotation models, government scheme details (e.g. PM-KISAN, Uttarakhand Apple Mission), and marketing advice. Includes animated typing indicators, skeleton loaders, and interactive query starter cards.
2.  **Review Re-Composer:** Integrates a live re-composition button on the review detail panel, allowing merchants to draft personalized customer replies using Google Gemini.
3.  **Social Marketing AI Writer:** Replaces static caption templates with a live Gemini-powered promotional writer that creates copy referencing Himalayan purity and traditional farming.
4.  **Local Fallback Engine:** Features a smart offline query handler that automatically handles responses if `GEMINI_API_KEY` is missing or rate-limited.

---

## 🔌 API Documentation

### 1. Authentication Routes (`/api/auth`)
* `POST /api/auth/register` — Registers a new user. Enforces Zod validations.
* `POST /api/auth/login` — Authenticates credentials and returns a signed JWT.
* `POST /api/auth/google-simulated` — Sandbox Google OAuth sign-in flow for local testing.

### 2. AI Features Routes (`/api/ai`) (JWT Protected)
* `POST /api/ai/chat` — Chatbot business advisory query handler. Accepts a query `message` and `history` logs.
* `POST /api/ai/review-reply` — Generates a warm, professional customer review response.
* `POST /api/ai/marketing-caption` — Drafts high-engagement social captions with relevant hashtags.

---

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ruralgrow
JWT_SECRET=your_super_secure_jwt_secret_key

# Google Gemini API Key (Required for live AI features)
GEMINI_API_KEY=your_google_gemini_api_key

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

### 2. Start the Frontend Client
```bash
cd ../frontend
npm install
npm run dev
```
*Client interface will load at `http://localhost:5173`.*

---

## 📁 Week 7 Submission Packets
All required deliverables are compiled in the root workspace directory:
- **Prompt Testing log:** [`PROMPTS.md`](PROMPTS.md) (detailing prompts optimization and benchmarks).
- **LMS ZIP Packet:** `W7_Submission_TBI-26100640.zip` (consolidating walkthrough docs).
