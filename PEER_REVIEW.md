# Peer Code Review - Week 7

## Classmate Repository: ANMOLRAWAT990 / Sentinaut
**Repository Link:** https://github.com/ANMOLRAWAT990/Sentinaut.git

---

### 1. Architectural Observation
The repository uses a FastAPI (Python) backend connected to MongoDB, with a React frontend built on Vite. In the backend, all database helpers, Pydantic schemas, and REST endpoints are declared directly within a single main file (`backend/main.py`). While this is simple to run, as the project grows, it would be architecturally superior to utilize FastAPI's `APIRouter` to split routing into separate files (e.g. `/routes/reviews.py` and `/routes/actions.py`) to keep the startup server file modular.

### 2. Code Suggestion
In `backend/main.py` lines 68–76 inside the GET single review handler, the code checks for MongoDB BSON `InvalidId` to fall back on custom string IDs:
```python
try:
    review = reviews_collection.find_one({"_id": ObjectId(id)})
except InvalidId:
    review = reviews_collection.find_one({"id": id})
```
To prevent querying the database twice on mismatch and enforce structural schema integrity, consider standardizing all records to use either BSON ObjectIds or custom UUID strings exclusively, rather than mixing both types in the find filters.

### 3. Question
I noticed in your CORS middleware setup in `main.py` that you set `allow_origins=["*"]` and `allow_credentials=False`. When you deploy this project to production, do you plan to lock this down to your specific frontend domain and toggle `allow_credentials=True` to support session cookies or JWT tokens?

---

## 🌐 Deliverable 3: Week 9 Peer Live App Testing Feedback Template

### Peer Test #1
- **Classmate Name / App Name**: Classmate A (e.g. Sentinaut / AgroTech)
- **Live Vercel App URL**: `https://classmate1-app.vercel.app`
- **1 Thing That Works Well**: The homepage loads quickly and the responsive navigation on mobile screens transitions smoothly between pages. The authentication flow registered my test account instantly.
- **1 Bug or Issue Found**: 
  - **Issue**: On the AI Chat page, submitting a query without input causes a 500 API error toast instead of inline client-side validation.
  - **Steps to Reproduce**:
    1. Navigate to `/ai-chat`.
    2. Leave the chat text input empty.
    3. Click the "Send" button.
    4. *Observed Result*: A red 500 Server Error notification appears instead of asking the user to type a message first.

---

### Peer Test #2
- **Classmate Name / App Name**: Classmate B (e.g. EcoHimalaya / CropCare AI)
- **Live Vercel App URL**: `https://classmate2-app.vercel.app`
- **1 Thing That Works Well**: The AI crop advisory output is detailed, well-formatted with markdown bolding and bullet points, and provides helpful context for small farmers.
- **1 Bug or Issue Found**: 
  - **Issue**: Refreshing the browser on the `/dashboard` route results in a Vercel 404 page ("PAGE_NOT_FOUND").
  - **Steps to Reproduce**:
    1. Log in to the application and navigate to `https://classmate2-app.vercel.app/dashboard`.
    2. Press `F5` or click browser Refresh.
    3. *Observed Result*: Vercel returns a 404 error page. *(Fix: Add `vercel.json` SPA rewrite rule `/{*}` -> `/index.html`)*.

