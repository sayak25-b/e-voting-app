# 🗳️ E-Voting Application (Backend)

A secure backend voting system where users can register, view candidates, and vote once. The system ensures that each user can vote only once using a unique government ID (Aadhar Card Number). The application also provides an admin panel for managing candidates.

---

## 🚀 Features

- User Signup and Login using **Aadhar Card Number**
- Secure voting system (one user can vote only once)
- View list of candidates
- Live vote count for each candidate
- Results sorted by vote count
- User profile management
- Change user password
- Admin panel for candidate management
- Admin cannot vote

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**

---

## 📂 Project Structure

```
voting-app-backend
│
├── models
│   ├── User.js
│   └── Candidate.js
│
├── routes
│   ├── authRoutes.js
│   ├── voteRoutes.js
│   └── candidateRoutes.js
│
├── controllers
│
├── middleware
│
├── config
│
├── server.js
└── package.json
```

---

## 👤 User Functionality

1. User Signup / Login
2. View list of candidates
3. Vote for one candidate
4. After voting, user cannot vote again
5. View live vote results
6. Change password
7. Login using **Aadhar number + password**

---

## 👑 Admin Functionality

Admin can:

- Add new candidates
- Update candidate information
- Delete candidates

⚠️ Admin **cannot vote**

---

## 🔗 API Routes

### User Authentication

| Method | Route | Description |
|------|------|-------------|
| POST | `/signup` | Create a new user account |
| POST | `/login` | Login using Aadhar number and password |

---

### Voting

| Method | Route | Description |
|------|------|-------------|
| GET | `/candidates` | Get list of candidates |
| POST | `/vote/:candidateId` | Vote for a candidate |

---

### Vote Counts

| Method | Route | Description |
|------|------|-------------|
| GET | `/vote/counts` | Get candidates sorted by vote count |

---

### User Profile

| Method | Route | Description |
|------|------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile/password` | Change user password |

---

### Admin Candidate Management

| Method | Route | Description |
|------|------|-------------|
| POST | `/candidates` | Create a new candidate |
| PUT | `/candidates/:candidateId` | Update candidate |
| DELETE | `/candidates/:candidateId` | Delete candidate |

---

## 🔐 Security Features

- JWT authentication
- Unique Aadhar ID for every user
- One user → One vote rule
- Admin role-based access control

---

## ⚙️ Installation

Clone the repository from GitHub:

```bash
git clone https://github.com/yourusername/e-voting-app.git
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

## 📊 Future Improvements

- Frontend UI (React)
- Email verification
- Election start/end timer
- Candidate images
- Admin dashboard

---

## 🧪 Testing the API using Postman

⭐ If you like this project, feel free to star the repository!
