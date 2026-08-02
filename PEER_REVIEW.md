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

## 👥 Peer Review 2: AgriGrow AI

* **Application Name:** AgriGrow Rural Marketplace
* **Live App URL:** [https://agri-grow.vercel.app](https://agri-grow.vercel.app)
* **Testing Date:** July 30, 2026

### 🟢 1. What Works Well
> The agricultural scheme recommendation wizard is very intuitive. Selecting a specific crop (e.g. Apples or Millets) immediately filters relevant state subsidies and Kisan Credit Card information with clear eligibility guidelines.

### 🔴 2. Bug / Issue Found
> **Issue:** Mobile Navigation Drawer Overflow on Small Viewports.  
> **Severity:** Low (UI Alignment)  

#### Steps to Reproduce:
1. Open [https://agri-grow.vercel.app](https://agri-grow.vercel.app) on a mobile device or shrink the browser viewport width below `400px`.
2. Click the top hamburger menu icon (`☰`) to open the mobile drawer.
3. **Observed Behavior:** The navigation drawer items overlap with the fixed background header buttons, making lower menu links unclickable on mobile screens.

#### 💡 Constructive Suggestion:
Add `z-50` and `overflow-y-auto` CSS utility classes to the mobile navigation drawer container to ensure it renders on top of all header elements across mobile resolutions.
