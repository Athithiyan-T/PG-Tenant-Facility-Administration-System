# PG Tenant & Facility Administration System

A full-stack property management application with:
- `backend/` — Express API with MongoDB and JWT auth
- `frontend/` — React + Vite SPA

This repo is ready for local development and production deployment with backend on Render and frontend on Vercel.

## Project structure

- `backend/` — Node.js + Express + MongoDB (Mongoose)
- `frontend/` — React + Vite
- `DEPLOYMENT_GUIDE.md` — deployment instructions for Render/Vercel

## Prerequisites

- Node.js + npm
- MongoDB Atlas or local MongoDB

## Local setup

### Backend

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `backend/.env` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pg_tenant_facility
JWT_SECRET=dev_secret_change_me
CLIENT_ORIGIN=http://localhost:5173
```

3. Start the backend:

```bash
npm run dev
```

4. Seed sample data (optional):

```bash
npm run seed
```

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create `frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the frontend:

```bash
npm run dev
```

4. Open the app:

```text
http://localhost:5173
```

## Environment variables

### Backend

Your backend code uses:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret key for signing JWTs
- `CLIENT_ORIGIN` — frontend origin allowed by CORS

### Frontend

Your frontend uses:
- `VITE_API_BASE_URL` — backend API base URL

## Deployment

### Backend: Render

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLIENT_ORIGIN=https://your-frontend.vercel.app`

### Frontend: Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://your-backend.onrender.com/api`

> If you have `frontend/vercel.json`, Vercel can handle SPA routing correctly.

## Git and deployment workflow

From repo root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you already have `.env` files tracked, remove them from git while keeping them locally:

```bash
git rm --cached backend/.env
 git rm --cached frontend/.env
git commit -m "Remove local env files from git tracking"
```

For updates:

```bash
git add .
git commit -m "Update project"
git push
```

## Keeping secrets safe

A root `.gitignore` file is included to keep local environment files and build artifacts out of Git.
Make sure these are ignored locally and never pushed:

- `backend/.env`
- `frontend/.env`
- `node_modules/`
- `frontend/dist/`

## API overview

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/register-admin`
- `POST /api/auth/register-tenant`

### Rooms
- `GET /api/rooms`
- `POST /api/rooms`
- `PUT /api/rooms/:id`
- `DELETE /api/rooms/:id`
- `GET /api/rooms/my`
- `GET /api/rooms/:id`

### Complaints
- `GET /api/complaints`
- `POST /api/complaints`
- `PUT /api/complaints/:id/status`

### Services
- `GET /api/services`
- `POST /api/services`
- `PUT /api/services/:id/status`

## Demo credentials

- Admin: `admin@pg.com` / `Admin@123`
- Tenant: `tenant@pg.com` / `Tenant@123`

## Notes

- Keep `.env` files out of Git.
- Use a strong random `JWT_SECRET` in production.
- Make sure MongoDB Atlas allows access from Render if using Atlas.
- Set `CLIENT_ORIGIN` to your Vercel app URL for production.

