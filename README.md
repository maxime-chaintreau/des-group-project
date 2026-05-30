# Indead — Freelance Job Marketplace

> A full-stack platform connecting employers with freelancers for job posting, applications, real-time chat, and secure payments.

**Live URL:** https://des-group-project.vercel.app  
**Backend:** https://indead-backend.onrender.com  
**GitHub:** https://github.com/maxime-chaintreau/des-group-project

---

## Problem Statement

Freelancers and small businesses struggle to find each other without paying high fees to large platforms. Indead provides a direct, lightweight marketplace where employers post jobs, freelancers apply, negotiate, and get paid — all in one place.

**Target users:** Small business owners and independent contractors.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                     │
│              React 19 · React Router · Stripe.js         │
│          https://des-group-project.vercel.app            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS + WebSocket
┌──────────────────────▼──────────────────────────────────┐
│                   BACKEND (Render)                       │
│         Node.js · Express 5 · Socket.io                  │
│         https://indead-backend.onrender.com              │
│                                                          │
│  Routes:                                                 │
│  /api/auth      — login, register, token validation      │
│  /api/jobs      — CRUD job listings                      │
│  /api/applications — apply, update status                │
│  /api/messages  — conversation history                   │
│  /api/payments  — Stripe intent + payment records        │
│  /api/users     — profile management                     │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
┌──────────▼──────────┐   ┌──────────▼──────────────────┐
│  PostgreSQL (Render)│   │      Stripe API              │
│  Managed database   │   │  Payment intents             │
│  5 tables           │   │  Card processing             │
└─────────────────────┘   └──────────────────────────────┘
```

---

## Tech Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Frontend   | React 19, React Router 7, Stripe.js       |
| Backend    | Node.js, Express 5, Socket.io 4           |
| Database   | PostgreSQL (Render managed)               |
| Auth       | JWT + bcrypt                              |
| Payments   | Stripe Payment Intents                    |
| Real-time  | Socket.io WebSockets                      |
| Deployment | Vercel (frontend) + Render (backend + DB) |

---

## APIs & Cloud Services

- **Stripe** — Payment Intents API for employer-to-freelancer payments. Called from backend only (secret key never exposed to client).
- **Render PostgreSQL** — Managed cloud database. Configured via `DATABASE_URL` environment variable with SSL.
- **Render Web Service** — Backend hosting with auto-deploy from GitHub main branch.
- **Vercel** — Frontend hosting with CDN, instant deployments on push.
- **Socket.io** — Real-time events for job updates, application notifications, and live messaging.

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
cd backend
cp .env.example .env
# Fill in your values in .env
npm install
node server.js
```

### Frontend

```bash
cd frontend
cp .env.example .env
# Fill in your values in .env
npm install
npm start
```

### Database

Connect to your PostgreSQL instance and run the SQL in `backend/docs/db_creation.txt`.

---

## Environment Variables

### Backend (`backend/.env.example`)

```
PORT=
PGUSERNAME=
PGPASSWORD=
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
ALLOWED_ORIGINS=
```

### Frontend (`frontend/.env.example`)

```
REACT_APP_API_URL=
REACT_APP_SOCKET_URL=
REACT_APP_STRIPE_KEY=
```

---

## Deployment

**Backend (Render):**

1. Create a Render Web Service pointing to the `backend/` folder
2. Build command: `npm install`
3. Start command: `node server.js`
4. Add environment variables in Render dashboard

**Frontend (Vercel):**

1. Import GitHub repo, set root directory to `frontend/`
2. Add environment variables in Vercel dashboard

---

## Demo Login

| Role       | Email           | Password |
| ---------- | --------------- | -------- |
| Employer   | test1@gmail.com | a        |
| Freelancer | test@gmail.com  | a        |

---

## Test Plan

| Test          | Steps                                                  | Expected                            |
| ------------- | ------------------------------------------------------ | ----------------------------------- |
| Register      | Go to /register, fill form, submit                     | Redirected to home, logged in       |
| Login         | Go to /login, enter credentials                        | Redirected to home                  |
| Create job    | Login as employer, go to /create-job                   | Job appears in list                 |
| Apply         | Login as freelancer, select a job, submit application  | Application card appears            |
| Update status | Login as employer, change application status           | Freelancer sees update in real-time |
| Payment       | Set status to accepted, enter card 4242 4242 4242 4242 | Payment recorded                    |
| Chat          | Click chat icon, search for a user, send message       | Message appears in real-time        |

---

## Team

| Name   | Role                    |
| ------ | ----------------------- |
| Maxime | Backend Lead            |
| Nikola | Frontend Lead           |
| Nathan | Cloud & DevOps Lead     |
| Samy   | QA & Documentation Lead |
