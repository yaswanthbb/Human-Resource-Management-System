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

# 📂 Project Structure

```
backend/
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── server.js
  └── package.json

frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── api/
  │   └── App.jsx
  └── package.json
```

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

## 3️⃣ Create `.env` File

Create `backend/.env` and add:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hrms
JWT_SECRET=your_secret
PORT=5000
```

## 4️⃣ Run Server

```
npm start
```

Backend starts at:

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

### **Team Assignment**

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

## 2️⃣ Run React App

```
npm run dev
```

Frontend loads at:

```
http://localhost:5173
```

---


# 🔒 Authentication

The frontend stores JWT token in `localStorage`.
Axios is configured to always send:

```
Authorization: Bearer <token>
```

---

# 📝 Notes

* MySQL auto-increments IDs by design — deleting a row does **not** reuse old IDs.
* Make sure your MySQL server is running before starting backend.
* Once the server runs for the first time, Sequelize will automatically create tables in your database.


---