# Week 9 Peer Testing Feedback Report

**Student Intern ID:** TBI-26100640  
**Project:** RuralGrow AI  
**GitHub Repository:** [Saurabhparihar12/RuralGrow-AI](https://github.com/Saurabhparihar12/RuralGrow-AI)  
**Live Production URL:** [https://ruralgrow-ai.onrender.com](https://ruralgrow-ai.onrender.com)

---

## 👥 Peer Review 1: Sentinaut AI

* **Application Name:** Sentinaut AI Review Analytics
* **Live App URL:** [https://sentinaut.vercel.app](https://sentinaut.vercel.app)
* **Testing Date:** July 30, 2026

### 🟢 1. What Works Well
> The UI design and visual aesthetics are exceptionally sleek. The dark-mode glassmorphic dashboard with real-time sentiment distribution charts renders very smoothly. The sentiment classification engine responds quickly when pasting customer feedback snippets.

### 🔴 2. Bug / Issue Found
> **Issue:** CORS Block & Token Expiration Handling on Direct API Requests.  
> **Severity:** Medium  

#### Steps to Reproduce:
1. Open [https://sentinaut.vercel.app/login](https://sentinaut.vercel.app/login) in Google Chrome or Microsoft Edge.
2. Register a new user account and log in to access the merchant dashboard.
3. Open Developer Tools (`F12`) ➔ **Network** tab.
4. Leave the tab open for 10 minutes (idle state).
5. Attempt to post a new review or run a sentiment filter query.
6. **Observed Behavior:** The request fails with a CORS preflight / `401 Unauthorized` network error, but the UI remains on the dashboard without clearing localStorage or redirecting to `/login`.

#### 💡 Constructive Suggestion:
Add an API response interceptor to the frontend fetch/axios client that catches 401 statuses, automatically clears expired JWT tokens, and redirects the user back to `/login` with an informative toast message.

---

## 👥 Peer Review 2: Sejoura

* **Application Name:** Sejoura Homestay & Travel Booking
* **Live App URL:** [https://sejoura-frontend.vercel.app](https://sejoura-frontend.vercel.app)
* **Testing Date:** August 2, 2026

### 🟢 1. What Works Well
> The property discovery cards and hero section visuals render with high quality. The filter bar for searching regional stays, homestays, and mountain retreats operates smoothly with responsive layout transitions.

### 🔴 2. Bug / Issue Found
> **Issue:** Form Validation & Input Sanitization Error on Booking Inquiry Form.  
> **Severity:** Low (Input Sanitization)  

#### Steps to Reproduce:
1. Open [https://sejoura-frontend.vercel.app](https://sejoura-frontend.vercel.app) in your browser.
2. Click on any listed homestay card to view property details.
3. Scroll down to the booking inquiry form.
4. Enter special characters or unformatted text in the Full Name input field and click Submit.
5. **Observed Behavior:** The form submits without client-side input pattern validation, causing raw unformatted text strings to render in the confirmation modal.

#### 💡 Constructive Suggestion:
Add input sanitization and HTML pattern validation (e.g. `pattern="[A-Za-z ]+"`) to the booking input fields before triggering API submission.
