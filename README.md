# RuralGrow AI

A simple review reply helper and social media caption generator built to assist local Uttarakhand farmers, weavers, and homestay owners in managing their online presence.

## Project Structure
* `frontend/`: React + Vite client application
* `backend/`: Node.js + Express.js REST API server
* `W4_APICollection_TBI-26100640.json`: Saved Postman API request test suite
* `W4_FrontendBackendConnection_TBI-26100640.pdf`: Connection verification screenshot pack

---

## Local Setup & Installation

### 1. Backend Server Setup
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file in the backend root based on `.env.example`:
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ruralgrow
   ```
   *Note: If no MONGODB_URI is provided, the API automatically falls back to reading/writing JSON records from the local `backend/data/database.json` file, allowing you to test without a running MongoDB database.*
4. Start the backend in development hot-reload mode:
   ```bash
   npm run dev
   ```
   *The REST API will listen on port `5000`.*

### 2. Frontend Client Setup
1. Navigate into the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The client interface will load at `http://localhost:5173`.*

---

## REST API Endpoint Details
The backend implements 6 main endpoints:
* `GET /api/reviews` — Fetch review list (supports filtering by `?sentiment=positive|negative|neutral` and searching by `?search=basmati`)
* `GET /api/reviews/:id` — Fetch details of a single review log
* `POST /api/reviews` — Log a new customer review (auto-assigns sentiment and reply suggestion templates)
* `PUT /api/reviews/:id` — Update review text or rating values
* `DELETE /api/reviews/:id` — Remove a review entry
* `POST /api/reviews/:id/reply` — Manually trigger AI-drafted reply suggestion updates

---

## Postman API Testing
To test endpoints, import the provided collection file into Postman or Thunder Client:
1. Load Postman and click **Import**.
2. Drag and drop the file `W4_APICollection_TBI-26100640.json` from the project root.
3. Execute and verify the mock queries against your running local server!
