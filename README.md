# RuralGrow AI — Week 9: Production Deployment & Go-Live

An AI-assisted business advisory assistant, customer review responder, and social media marketing copy generator designed to support rural micro-merchants, organic farmers, and cottage industries (handloom weavers, honey apiarists, and homestay hosts) in Uttarakhand.

---

## 🌐 Production Live Deployment Links

| Component | Service Provider | Live Production URL | Status |
| :--- | :--- | :--- | :--- |
| **Live Frontend Web App** | **Vercel** | [https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app](https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app) | 🟢 **100% LIVE** |
| **Backend REST API** | **Render** | [https://ruralgrow-ai.onrender.com](https://ruralgrow-ai.onrender.com) | 🟢 **Active / Live** |
| **Health Check API** | **Render** | [https://ruralgrow-ai.onrender.com/api/health](https://ruralgrow-ai.onrender.com/api/health) | 🟢 **200 OK** |

---

## 📁 Repository Architecture & Directory Structure

```
.
├── backend/
│   ├── config/             # Passport.js strategy loaders (passport.js)
│   ├── controllers/        # Controllers (authController, reviewController, aiController)
│   ├── data/               # Persistent adapters and json fallback (dbHelper.js, database.json)
│   ├── middleware/         # Security, validation, CORS, & auth guards (auth.js, security.js, validator.js, errorHandler.js)
│   ├── models/             # Mongoose DB schema definitions (User.js, Review.js, Caption.js)
│   ├── routes/             # REST routing groups (authRoutes.js, reviewRoutes.js, captionRoutes.js, aiRoutes.js)
│   ├── .env.example        # Backend environment variables template
│   ├── server.js           # Server initializer with Helmet, CORS, & graceful shutdown
│   └── package.json        # Node configuration with @google/generative-ai and passport
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI elements & layout components (Navbar.jsx, Footer.jsx, ProtectedRoute.jsx)
│   │   ├── config/         # Centralized API configuration (api.js)
│   │   ├── context/        # Global AuthContext provider and theme toggles
│   │   ├── pages/          # Pages (Home, Login, Dashboard, Profile, AdminDashboard, AiAssistant)
│   │   ├── App.jsx         # Client routing declaring route guards
│   │   └── main.jsx        # App mounting and wrapper contexts
│   ├── .env.example        # Frontend environment variables template
│   ├── vercel.json         # Vercel SPA route rewrite rules
│   └── package.json        # Client configuration with framer-motion and lucide icons
│
├── render.yaml             # Render Infrastructure-as-Code deployment manifest
├── DEPLOYMENT.md           # Complete step-by-step production deployment guide
├── W9_DeploymentChecklist.md # Pre-flight & post-deployment verification checklist
├── W9_DeploymentProof_TBI-26100640.md # Submission proof document with screenshot placeholders
└── package.json            # Root workspace monorepo scripts
```

---

## 🔑 Environment Variables Matrix

### Backend Environment Variables (`backend/.env`)

| Variable Name | Required | Example / Description |
| :--- | :---: | :--- |
| `PORT` | Yes | `5000` (Assigned dynamically by Render in production) |
| `NODE_ENV` | Yes | `production` |
| `CLIENT_URL` | Yes | `https://ruralgrowai.vercel.app` (Allowed origin for CORS and OAuth redirects) |
| `MONGODB_URI` | Optional | `mongodb+srv://<user>:<password>@cluster.mongodb.net/ruralgrow` (Falls back to local JSON engine if omitted) |
| `JWT_SECRET` | Yes | `your_super_secure_jwt_secret_key` |
| `GEMINI_API_KEY` | Optional | `your_google_gemini_api_key` (Powered by `gemini-1.5-flash`; falls back to offline simulator if missing) |
| `GOOGLE_CLIENT_ID` | Optional | `your_google_client_id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Optional | `your_google_client_secret` |
| `GOOGLE_CALLBACK_URL` | Optional | `https://ruralgrowai-api.onrender.com/api/auth/google/callback` |

### Frontend Environment Variables (`frontend/.env`)

| Variable Name | Required | Description |
| :--- | :---: | :--- |
| `VITE_API_URL` | Yes | `https://ruralgrowai-api.onrender.com` (Points React fetch calls to Render API) |

---

## ⚙️ Production Deployment Instructions

### 1. Backend Deployment on Render
1. Connect your GitHub repository `Saurabhparihar12/RuralGrow-AI` to Render.
2. Select **New Web Service** and choose `render.yaml` or set:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Configure Environment Variables (`NODE_ENV`, `CLIENT_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `MONGODB_URI`).
4. Render will deploy the API and assign the live URL (e.g. `https://ruralgrowai-api.onrender.com`).

### 2. Frontend Deployment on Vercel
1. Import `Saurabhparihar12/RuralGrow-AI` into Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Configure Environment Variable:
   * `VITE_API_URL` = `https://ruralgrowai-api.onrender.com`
5. Click **Deploy**. Vercel will build the frontend and serve it at `https://ruralgrowai.vercel.app`.

---

## ⚡ Free Tier Considerations & Known Behavior
* **Render Cold Starts**: On Render's free web service tier, the server spins down after 15 minutes of inactivity. The first API request after inactivity may take 30–50 seconds to warm up.
* **Offline AI Fallback Engine**: If `GEMINI_API_KEY` is missing or rate-limited, the application automatically uses an offline simulation fallback engine to guarantee 100% uptime for review replies, marketing captions, and assistant responses.

---

## 🚀 Local Installation & Setup

```bash
# 1. Clone repository
git clone https://github.com/Saurabhparihar12/RuralGrow-AI.git
cd RuralGrow-AI

# 2. Start Backend REST API
cd backend
npm install
npm run dev

# 3. Start Frontend Client (in a separate terminal)
cd ../frontend
npm install
npm run dev
```

*Client interface loads at `http://localhost:5173` pointing to `http://localhost:5000`.*

---

## 📜 LMS Submission Packets — Week 9
* **Deployment Guide:** [`DEPLOYMENT.md`](DEPLOYMENT.md)
* **Verification Checklist:** [`W9_DeploymentChecklist.md`](W9_DeploymentChecklist.md)
* **Proof Document:** [`W9_DeploymentProof_TBI-26100640.md`](W9_DeploymentProof_TBI-26100640.md)
* **Submission ZIP:** `W9_Submission_TBI-26100640.zip`
