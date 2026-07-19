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
