# 🎓 PIET Research Incentive Claim System — Frontend

A modern web application for **Panipat Institute of Engineering and Technology (PIET)** that streamlines the process of submitting, tracking, and managing research incentive claims for faculty members.

> **Live:** [https://incentives.piet.co.in](https://incentives.piet.co.in)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Related Repositories](#related-repositories)
- [License](#license)

---

## Overview

The PIET Research Incentive Claim System allows faculty members to submit incentive claims for their research publications and provides administrators with a comprehensive dashboard for reviewing, managing, and analyzing submissions across departments.

The platform supports the full lifecycle of a claim — from faculty registration and submission to admin review and processing — with features like PDF report generation, in-app notifications, and department-wise analytics.

---

## Features

### Faculty Portal
- **User Registration & Login** — Secure authentication with JWT-based sessions
- **Password Reset** — Email-based password recovery flow
- **Claim Submission** — Submit research incentive claims with publication details, author information, and supporting documents (uploaded to Cloudinary)
- **My Submissions** — Track the status of all submitted claims (Submitted / Processed)
- **Profile Management** — View and update profile info including academic IDs (Scopus, ORCID, Vidhwan, Google Scholar) and bank details
- **PDF Report Generation** — Generate downloadable PDF reports of claim submissions
- **In-App Notifications** — Real-time notification bell for claim status updates

### Admin Panel
- **Admin Dashboard** — Overview of all claims with department-wise research statistics and leaderboard charts
- **Submission Management** — View, filter, and process all faculty claims; update claim statuses
- **User Management** — View registered faculty, browse individual user claims
- **Department Analytics** — Visual breakdowns of claims by department using interactive charts
- **Data Backups** — Generate and download system backups; emergency login via TOTP
- **Custom Filters** — Filter claims by department, status, and date range

---

## Tech Stack

| Layer        | Technology                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------- |
| **Framework**    | [React 19](https://react.dev/) with [Vite 6](https://vitejs.dev/)                             |
| **Routing**      | [React Router DOM v7](https://reactrouter.com/)                                               |
| **Styling**      | [Tailwind CSS v4](https://tailwindcss.com/)                                                   |
| **HTTP Client**  | [Axios](https://axios-http.com/)                                                              |
| **Animations**   | [Framer Motion](https://www.framer.com/motion/)                                               |
| **Charts**       | [Recharts](https://recharts.org/)                                                             |
| **Icons**        | [Lucide React](https://lucide.dev/) + [Font Awesome 6](https://fontawesome.com/)              |
| **PDF Export**   | [jsPDF](https://github.com/parallax/jsPDF)                                                    |
| **Excel Export** | [SheetJS (xlsx)](https://sheetjs.com/)                                                         |
| **Analytics**    | Google Analytics (gtag.js)                                                                     |

---

## Project Structure

```
piet-p1/
├── public/                     # Static assets
├── src/
│   ├── Components/             # Reusable UI components
│   │   ├── navbar.jsx          # Faculty navigation bar
│   │   ├── navbar2.jsx         # Alternate navigation bar
│   │   ├── sidebar.jsx         # Faculty sidebar navigation
│   │   ├── adminNavbar.jsx     # Admin navigation bar
│   │   ├── adminSidebar.jsx    # Admin sidebar navigation
│   │   └── NotificationBell.jsx # In-app notification component
│   ├── Pages/                  # Page-level components
│   │   ├── login.jsx           # Faculty login
│   │   ├── register.jsx        # Faculty registration
│   │   ├── dashboard.jsx       # Faculty dashboard
│   │   ├── claim.jsx           # Claim submission form
│   │   ├── mySubmissions.jsx   # Faculty submissions list
│   │   ├── profile.jsx         # Faculty profile page
│   │   ├── adminLogin.jsx      # Admin login
│   │   ├── adminDashboard.jsx  # Admin dashboard with analytics
│   │   ├── adminSubmissions.jsx # Admin claim management
│   │   ├── adminManageUsers.jsx # Admin user management
│   │   ├── adminBackups.jsx    # Admin backup management
│   │   ├── reset-password-request.jsx
│   │   ├── reset-password.jsx
│   │   └── error.jsx           # 404 error page
│   ├── CSS/                    # Component-level stylesheets
│   ├── utils/
│   │   └── pdfGenerator.js     # PDF report generation utility
│   ├── image/                  # Image assets
│   ├── assets/                 # Static assets
│   ├── App.jsx                 # Root app component
│   ├── App.css                 # Global app styles
│   ├── main.jsx                # App entry point
│   ├── index.css               # Global CSS / Tailwind imports
│   ├── baseurl.js              # API base URL configuration
│   └── react-router-setup.jsx  # Route definitions
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── netlify.toml                # Netlify deployment config
├── vercel.json                 # Vercel deployment config
├── _redirects                  # SPA redirect rules
├── serve.json                  # Static server config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A running instance of the [piet-p1-backend](https://github.com/raghavkapoor-prog/piet-p1-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/raghavkapoor-prog/piet-p1.git
cd piet-p1

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

---

## Environment Configuration

Update the API base URL in `src/baseurl.js` to point to your backend:

```js
// For local development
const baseUrl = "http://localhost:4000/"

// For production
const baseUrl = "https://your-backend-url.com/"
```

---

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR           |
| `npm run build`   | Create production build in `dist/`       |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint across the project            |

---

## Deployment

The project is pre-configured for multiple deployment platforms:

- **Vercel** — `vercel.json` with SPA rewrites
- **Netlify** — `netlify.toml` + `_redirects` for SPA routing
- **Static Hosting** — `serve.json` for `serve` or similar static servers

All configurations include SPA fallback rewrites to ensure client-side routing works correctly.

---

## Related Repositories

| Repository | Description |
| --- | --- |
| [piet-p1-backend](https://github.com/raghavkapoor-prog/piet-p1-backend) | Express.js + MongoDB REST API backend |

---

## License

This project is developed for **Panipat Institute of Engineering and Technology (PIET)**.
