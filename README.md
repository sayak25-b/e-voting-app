# 🗳️ Voting Application Backend

A secure **Voting Application Backend** built with **Node.js, Express, MongoDB, and JWT authentication**. This system allows registered users to vote for candidates **only once**, while an **admin** manages candidates and is strictly **restricted from voting**.

---

## 🚀 Features

### 👤 User Features

* User **Sign Up / Login** using **Aadhar Card Number + Password**
* Each user can **vote only once**
* View list of candidates
* View **live vote counts**, sorted by highest votes
* Secure password change
* JWT-based authentication

### 🛡️ Admin Features

* Admin can **add, update, and delete candidates**
* Admin **cannot vote at all**
* Role-based access control

---

## 🧠 Application Rules

* Aadhar Card Number must be **unique** for each user
* A user **cannot vote more than once**
* Admin accounts are **restricted from voting**
* Votes are counted and displayed in real time

---

## 🧩 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Token)
* **Password Security:** bcrypt
* **API Testing:** Postman

---

## 📂 Database Models

### 👤 User Model

```js
{
  name: String,
  aadharNumber: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  hasVoted: { type: Boolean, default: false }
}
```

### 🧑‍💼 Candidate Model

```js
{
  name: String,
  party: String,
  voteCount: { type: Number, default: 0 }
}
```

---

## 🔐 Authentication Routes

| Method | Route     | Description                   |
| ------ | --------- | ----------------------------- |
| POST   | `/signup` | Create a new user account     |
| POST   | `/login`  | Login using Aadhar + Password |

---

## 🗳️ Voting Routes

| Method | Route                | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/candidates`        | Get list of candidates |
| POST   | `/vote/:candidateId` | Vote for a candidate   |

---

## 📊 Vote Count Routes

| Method | Route          | Description                         |
| ------ | -------------- | ----------------------------------- |
| GET    | `/vote/counts` | Get candidates sorted by vote count |

---

## 👤 User Profile Routes

| Method | Route               | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/profile`          | Get logged-in user profile |
| PUT    | `/profile/password` | Change user password       |

---

## 🛠️ Admin Candidate Management Routes

> ⚠️ **Admin access only**

| Method | Route                      | Description       |
| ------ | -------------------------- | ----------------- |
| POST   | `/candidates`              | Add new candidate |
| PUT    | `/candidates/:candidateId` | Update candidate  |
| DELETE | `/candidates/:candidateId` | Delete candidate  |

---

## 🔐 Security Measures

* Password hashing using **bcrypt**
* JWT authentication middleware
* Role-based authorization
* One-user-one-vote enforcement

---

## ▶️ How to Run the Project

```bash
# Install dependencies
npm install

# Start server
npm start
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Testing

* Use **Postman** to test APIs
* Include JWT token in `Authorization` header

---

## 📌 Future Improvements

* Frontend (React)
* OTP verification for Aadhar
* Vote result dashboard
* Election scheduling

---

## 📄 License

This project is for **educational purposes**.


