#   FitLog — Workout Library & Gym Routine Tracker

> **"TRAIN WITH INTENT. LOG EVERY SET."**  
> A dark, no-nonsense gym companion web application built with **Next.js (App Router)** and **Tailwind CSS**. FitLog enables fitness enthusiasts to explore comprehensive exercise libraries, plan daily routines, manage saved lifts, and track completed sets with live metrics.

---


## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15+ (App Router)** | Full-stack React UI framework and robust page routing |
| **TypeScript** | Type safety, maintainability, and structured interfaces |
| **Tailwind CSS v4** | Dark-themed styling, responsive layout, and neon lime accents (`#ccff00`) |
| **React Context API** | Global state management across Navbar, Details, and My Plan pages |
| **LocalStorage** | Persistent client-side data caching surviving browser reloads |
| **Lucide React** | Sleek, modern vector icons |
| **React Toastify** | Animated, countdown progress bar toast notifications |

---

## 5 Key Features of FitLog

### 1.Dynamic Workout Library & Responsive 3x4 Grid
- Fetches 12 comprehensive exercises covering all major muscle groups (Chest, Arms, Back, Legs, Core, Shoulders, Full Body) from the live REST API.
- Responsive layout adapting seamlessly across mobile, tablet, and desktop (3x4 card grid on large screens).
- Displays category pill tags, workout name, equipment specifications, and a stats row (duration, calories, rating).

### 2.Routine Planner with Real-Time Navbar Badges
- Users can add exercises directly to **"Today's Plan"** or bookmark them for **"Save for Later"** from the details page.
- Real-time status badges in the sticky navbar instantly reflect active counts with live animation.
- Implements a smart 5-lift cap alert to prevent overtraining on Today's Plan.

### 3.Real-Time Live Metrics Dashboard
- The **My Plan** page features 3 dynamic summary metric cards: **Exercises**, **Minutes**, and **Calories**.
- Metrics recalculate live in real-time as lifts are added, removed, or switched between tabs using array reducers.

### 4.Interactive Completion & Routine Management
- **Mark as Done:** Planned lifts can be checked off with a single click, applying visual completion indicators (strikethrough title and neon badges).
- **Remove (X):** Easily discard workouts from the routine with instant metric recalculation.
- Custom styled **Progress Bar Toasts** trigger on every action with distinct colors (red for remove/warning, neon green for success).

### 5.Multi-Criteria Dynamic Sorting
- Interactive **"Sort By"** filter dropdown allows re-sorting workouts by **Duration**, **Calories Burned**, or **Rating**.
- Sort works instantly on both Today's Plan and Saved routines without extra page reloads or network requests.

### 6.Local Storage
- Never lose your workout routine on page refresh! All planned workouts, saved items, and completed states are safely stored in browser `localStorage`.

---

## Getting Started Locally

Follow these steps to run the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dtech0/NextJs.git
   cd NextJs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## License & Author

- Developed with by **Abdullah Al ([@dtech0](https://github.com/dtech0))**
- Assignment 6 — Programming Hero Web Development Batch 14.
- © 2026 FitLog — Workout Library. Train hard, log honest.
