# RuralGrow AI - Week 9 Production Deployment

RuralGrow AI is an AI-assisted business advisory assistant, customer-review responder, and social-media copy generator for rural micro-merchants, organic farmers, handloom weavers, honey apiarists, and homestay hosts in Uttarakhand.

## Live deployment

| Component | Provider | URL | Status |
| --- | --- | --- | --- |
| Frontend web app | Vercel | https://rural-grow-ai-eta.vercel.app | Live |
| Backend REST API | Render | https://ruralgrow-ai.onrender.com | Live |
| Backend health check | Render | https://ruralgrow-ai.onrender.com/api/health | 200 OK |

The live application URL for the Week 9 submission is https://rural-grow-ai-eta.vercel.app.

## Technology stack summary

| Layer | Technology | Production role |
| --- | --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion, Recharts | Responsive Vercel SPA and merchant dashboard |
| Backend | Node.js, Express, Passport Google OAuth, JWT | Render REST API, authentication, CRUD, and AI routes |
| Database | MongoDB Atlas with Mongoose | Persistent users, reviews, captions, and shops |
| AI | Google Gemini API with offline fallback | Agricultural assistant, review replies, and marketing captions |
| Security | Helmet, CORS allow-list, rate limiting, Zod validation, Mongo sanitization | Production request and authentication protections |

## Repository architecture

```text
backend/
  config/             Passport and Google OAuth configuration
  controllers/        Authentication, reviews, captions, and AI controllers
  data/               MongoDB adapter and local JSON fallback
  middleware/         Security, validation, CORS, auth, and error handling
  models/             Mongoose User, Review, Caption, and Shop models
  routes/             REST route groups
  server.js           Express server and health endpoint
frontend/
  src/components/    Reusable UI and layout components
  src/config/        Centralized API configuration
  src/context/       Authentication and session state
  src/pages/         Home, Login, Dashboard, Profile, Admin, and AI pages
  index.html          Vite document shell
render.yaml           Render deployment manifest
vercel.json           SPA fallback routing configuration
DEPLOYMENT.md         Deployment guide
W9_DeploymentChecklist.md  Week 9 verification checklist
```

## Environment variables

Configure secrets in the hosting dashboards. Do not commit `.env` files.

### Render backend

| Variable | Required | Production value or description |
| --- | --- | --- |
| `NODE_ENV` | Yes | `production` |
| `PORT` | Yes | `5000` (Render can assign the service port) |
| `CLIENT_URL` | Yes | `https://rural-grow-ai-eta.vercel.app` |
| `MONGODB_URI` | Yes for durable storage | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Long, random secret generated in Render |
| `GEMINI_API_KEY` | Optional | Google Gemini API key; offline fallback is used if absent |
| `GOOGLE_CLIENT_ID` | Required for real OAuth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Required for real OAuth | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Required for real OAuth | `https://ruralgrow-ai.onrender.com/api/auth/google/callback` |

### Vercel frontend

| Variable | Required | Production value or description |
| --- | --- | --- |
| `VITE_API_URL` | Recommended | `https://ruralgrow-ai.onrender.com` |

The frontend also has this production API fallback in source code so Vercel preview deployments continue to reach Render when the variable is missing.

For Google OAuth, add this exact Authorized redirect URI in Google Cloud:

```text
https://ruralgrow-ai.onrender.com/api/auth/google/callback
```

## Deployment instructions

### Render backend

1. Connect the GitHub repository `Saurabhparihar12/RuralGrow-AI` to Render.
2. Select the `backend` root directory.
3. Use `npm install` as the build command and `npm start` as the start command.
4. Add the Render variables listed above.
5. Verify `https://ruralgrow-ai.onrender.com/api/health` returns status `healthy`.

### Vercel frontend

1. Import `Saurabhparihar12/RuralGrow-AI` into Vercel.
2. Set the root directory to `frontend` and use the Vite framework preset.
3. Set `VITE_API_URL` to `https://ruralgrow-ai.onrender.com`.
4. Deploy and verify https://rural-grow-ai-eta.vercel.app.

## Known free-tier limitations

- Render's free web service spins down after inactivity. The first request after idle time can take approximately 30-60 seconds while the service wakes up.
- MongoDB Atlas must allow Render network access. Without a valid `MONGODB_URI`, the backend uses its local JSON fallback, which is not durable across an ephemeral service restart.
- If `GEMINI_API_KEY` is unavailable or rate-limited, the offline AI simulator provides fallback responses.
- Google OAuth works only when the Google Cloud redirect URI and Render OAuth variables exactly match the production callback URL.

## Local development

```bash
git clone https://github.com/Saurabhparihar12/RuralGrow-AI.git
cd RuralGrow-AI

cd backend
npm install
npm run dev

# In a second terminal
cd frontend
npm install
npm run dev
```

The local frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Week 9 submission files

- [Deployment guide](DEPLOYMENT.md)
- [Deployment checklist](W9_DeploymentChecklist.md)
- [Deployment proof PDF](W9_DeploymentProof_TBI-26100640.pdf)
- [Peer testing feedback](PEER_REVIEW.md)
- `W9_Submission_TBI-26100640.zip`
