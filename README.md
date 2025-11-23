# HRMS (Human Resource Management System)

A full-stack HR Management System with authentication, employee management, team management, and role assignment. Built with **React (Frontend)** + **Node.js + Express (Backend)** + **MySQL (Database)**.

---

# 🚀 Features

* User Registration & Login (JWT Authentication)
* Add / Edit / Delete Employees
* Add / Delete Teams
* Assign & Remove Employees from Teams
* Responsive UI for desktop + mobile
* Toast notifications for success & errors
* Clean and modern dashboard UI

---

# ⚙️ Backend Setup

## 1️⃣ Install Dependencies

```
cd backend
npm install
```

## 2️⃣ Create MySQL Database

```
CREATE DATABASE hrms;
```

## 3️⃣ Create `.env` File (use `.env.example`)

Copy the example file:

```
cp .env.example .env
```

Ensure the values match your local MySQL setup.

## 4️⃣ Run Server

```
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# 🖼️ API Overview

### **Auth Routes**

| Method | Route            | Description |
| ------ | ---------------- | ----------- |
| POST   | `/auth/register` | Create user |
| POST   | `/auth/login`    | Login       |
| POST   | `/auth/logout`   | Logout      |

### **Employee Routes**

| Method | Route            | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/employees`     | Get all employees |
| POST   | `/employees`     | Create employee   |
| PUT    | `/employees/:id` | Update employee   |
| DELETE | `/employees/:id` | Delete employee   |

### **Team Routes**

| Method | Route        | Description   |
| ------ | ------------ | ------------- |
| GET    | `/teams`     | Get all teams |
| POST   | `/teams`     | Create team   |
| DELETE | `/teams/:id` | Delete team   |

### **Team Assignment Routes**

| Method | Route                 | Description     |
| ------ | --------------------- | --------------- |
| POST   | `/team-assign/assign` | Assign employee |
| POST   | `/team-assign/remove` | Remove employee |

---

# 💻 Frontend Setup

## 1️⃣ Install Dependencies

```
cd frontend
npm install
```

## 2️⃣ Create `.env` File (use `.env.example`)

Copy the example file:

```
cp .env.example .env
```

Ensure API URL points to your local backend:

```
VITE_API_URL=http://localhost:5000
```

## 3️⃣ Run React App

```
npm run dev
```

Frontend loads at:

```
http://localhost:5173
```

---

# 🔗 Deployments

### **Frontend Deployment:**

[https://human-resource-management-system-beta.vercel.app/](https://human-resource-management-system-beta.vercel.app/)

### **Backend Deployment:**

[https://human-resource-management-system-production-690d.up.railway.app/](https://human-resource-management-system-production-690d.up.railway.app/)

---

# 🔒 Authentication

The frontend stores the JWT token in `localStorage` and sends it automatically via Axios:

```
Authorization: Bearer <token>
```

---

# 📝 Notes

* MySQL auto-increments IDs — deleting rows does **not** reuse IDs.
* Ensure MySQL is running before starting backend.
* Sequelize auto-creates tables on first run.
