# Production Deployment Architecture & Workflow Guide — Week 9

This document details the complete production deployment setup for **RuralGrow AI**, covering architecture, Render backend configuration, Vercel frontend configuration, security, CORS management, and troubleshooting.

---

## 🏗️ Production Architecture Overview

```
 ┌─────────────────────────────────────────┐
 │             Client Browser              │
 │ https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app │
 └────────────────────┬────────────────────┘
                      │
            HTTPS REST API Calls
            (JSON Web Tokens)
                      │
                      ▼
 ┌─────────────────────────────────────────┐
 │            Render Backend API           │
 │     https://ruralgrow-ai.onrender.com   │
 └─────────┬───────────────────┬───────────┘
           │                   │
           ▼                   ▼
 ┌───────────────────┐ ┌───────────────────┐
 │  MongoDB Atlas    │ │ Google Gemini AI  │
 │  Database Cluster │ │ (gemini-1.5-flash)│
 └───────────────────┘ └───────────────────┘
```

---

## 🛠️ Step 1: Preparing Backend for Render

### 1.1 CORS Configuration (`backend/middleware/security.js`)
In production, CORS is restricted to trusted origins:
```javascript
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app',
  'https://rural-grow-ai-eta.vercel.app',
  'http://localhost:5173'
].filter(Boolean);
```

### 1.2 Environment Variables in Render Dashboard
Navigate to **Render Dashboard -> Environment**:
* `NODE_ENV`: `production`
* `PORT`: `5000`
* `CLIENT_URL`: `https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app`
* `JWT_SECRET`: `[Secret Key]`
* `GEMINI_API_KEY`: `[Gemini API Key]`
* `MONGODB_URI`: `[MongoDB Atlas Connection String]`

### 1.3 Health Checks & Graceful Shutdown
* **Health Check URL**: `GET /api/health` returns status `200 OK` with uptime metadata.
* **Process Signal Handling**: The server listens to `SIGTERM` and `SIGINT` signals for graceful HTTP server and database socket teardown.

---

## 💻 Step 2: Preparing Frontend for Vercel

### 2.1 Centralized API Client (`frontend/src/config/api.js`)
All pages consume `API_BASE_URL`:
```javascript
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
```

### 2.2 SPA Rewrite Configuration (`frontend/vercel.json`)
To prevent 404 errors on direct navigation to sub-routes (`/dashboard`, `/ai-assistant`, `/profile`), Vercel rewrites all routes to `/index.html`:
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 2.3 Environment Variables in Vercel Dashboard
Navigate to **Vercel Project Settings -> Environment Variables**:
* `VITE_API_URL`: `https://ruralgrow-ai.onrender.com`

---

## 🧪 Step 3: Production Verification Checklist

1. **Verify Health Endpoint**:
   ```bash
   curl -i https://ruralgrow-ai.onrender.com/api/health
   ```
   *Expected Output*: `200 OK` JSON with `"status": "healthy"`.

2. **Verify CORS Headers**:
   ```bash
   curl -i -H "Origin: https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app" https://ruralgrow-ai.onrender.com/api/health
   ```
   *Expected Output*: `Access-Control-Allow-Origin: https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app`.

3. **Verify Auth Flow**:
   * Test registration at `/login`.
   * Verify JWT token storage in `localStorage`.
   * Verify access to protected route `/dashboard`.

4. **Verify AI Feature Execution**:
   * Test `/ai-assistant` query handler.
   * Verify live Gemini AI response or graceful fallback to local simulator.

---

## 🔧 Step 4: Troubleshooting Common Deployment Issues

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **CORS Blocked Error** | `CLIENT_URL` mismatch or missing origin header | Ensure `CLIENT_URL` in Render matches exact Vercel domain (`https://rural-grow-58fsd5yhj-rural-grow-ai.vercel.app`). |
| **Vercel 404 on Refresh** | Missing SPA rewrite rule | Verify `vercel.json` exists in `frontend/` directory with rewrite rules. |
| **Render Build Failure** | Wrong Root Directory | Ensure **Root Directory** is set to `backend` in Render project settings. |
| **First API Request Slow** | Render Free Tier Cold Start | Normal free-tier behavior (spins down after 15m idle). Retry after 30 seconds. |
| **AI Feature Fails** | Missing `GEMINI_API_KEY` | Set `GEMINI_API_KEY` in Render environment variables or verify offline fallback handles gracefully. |

