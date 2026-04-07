# 🏠 PG Tenant & Facility Administration System

## 📌 Overview
PG Tenant & Facility Administration System is a full-stack MERN application designed to streamline communication between tenants and PG management. Inspired by real-world challenges faced in day-to-day PG living, this system enables efficient handling of room management, service requests (cleaning, food, WiFi, electrical, etc.), and complaint tracking through dedicated admin and tenant dashboards. The platform improves transparency, response time, and overall living experience.

---

## 🚀 Features

### 🔐 Authentication
- Role-based login (Admin & Tenant)
- Secure authentication using JWT

### 🏢 Room Management
- Admin can add, update, and delete rooms
- Tenants can view room details

### 🛠️ Facility Services
- Room Cleaning
- Food Service
- CCTV Monitoring
- Washing Machine Access
- Electrical Support
- WiFi Support

### 📢 Complaint Management
- Tenants can raise complaints
- Categorized issues (Cleaning, WiFi, Electrical, etc.)
- Admin can update complaint status:
  - Pending
  - In Progress
  - Resolved

### 📊 Dashboard
- Separate dashboards for Admin and Tenant
- Easy tracking of requests and complaints

---

## 🧑‍💻 Tech Stack

**Frontend**
- React (Vite)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

---

## 📁 Project Structure
## 📁 Project Structure

```bash
pg-tenant-facility-admin-system/
│
├── backend/                           # Node.js + Express Backend
│   ├── config/                        # Database & config files
│   │   └── db.js
│   │
│   ├── models/                        # Mongoose schemas
│   │   ├── User.js
│   │   ├── Room.js
│   │   ├── Complaint.js
│   │   └── ServiceRequest.js
│   │
│   ├── controllers/                   # Business logic
│   │   ├── authController.js
│   │   ├── roomController.js
│   │   ├── complaintController.js
│   │   └── serviceController.js
│   │
│   ├── routes/                        # API routes
│   │   ├── authRoutes.js
│   │   ├── roomRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── serviceRoutes.js
│   │
│   ├── middleware/                    # Middleware (JWT, role auth)
│   │   └── authMiddleware.js
│   │
│   ├── utils/                         # Helper utilities
│   │
│   ├── server.js                      # App entry point
│   ├── .env                           # Backend environment variables
│   └── package.json
|
├── frontend/                          # React (Vite) Frontend
│   ├── public/                        # Static files
│   ├── src/
│   │   ├── assets/                    # Images, icons
│   │   ├── components/                # Reusable components
│   │   ├── pages/                     # Pages (Login, Dashboard, etc.)
│   │   ├── services/                  # API calls (Axios)
│   │   ├── context/                   # Global state (Auth context)
│   │   ├── utils/                     # Helper functions
│   │   ├── App.jsx                    # Root component
│   │   └── main.jsx                   # Entry point
│   │
│   ├── .env                           # Frontend environment variables
│   ├── package.json
│   └── vite.config.js
│

│
├── .gitignore
├── README.md
└── package.json                       # (Optional root config)
