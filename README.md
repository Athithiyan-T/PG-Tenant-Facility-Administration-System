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
pg-management-system/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
│ │
│ └── package.json
│
└── README.md
