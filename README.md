# ♻️ Recyclify – Backend

This is the **backend service** for the [Waste Management System](https://waste-management-frontend-topaz.vercel.app/), a MERN stack project designed to promote sustainable waste disposal through technology and machine learning.

The backend handles **user authentication**, **waste information**, **recycling requests**, **email notifications**, and **admin operations**, providing the core logic and APIs for the entire platform.

---

## 🚀 Features

- 🔐 **JWT Authentication** for secure user login and signup  
- 🧠 **Waste Classification** endpoint integrated with a trained ML model (via frontend)  
- ♻️ **Recycling Request System** allowing users to submit recyclable waste images  
- 📍 **Protected Routes** implemented with authentication middleware  
- 📧 **Email Notifications** using **Resend API** for signup and recycling updates  
- 👨‍💼 **Admin Dashboard Support** for reviewing and managing recycling requests  
- 🔒 **Secure Passwords** with **bcrypt hashing**  
- ✅ **Input Validation** powered by **validator.js**

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT |
| **Email Service** | Resend API |
| **Utilities** | bcrypt, validator |

---

## 📁 Project Structure
Waste-Management/ \
│\
├── src/\
│ ├── config/ # Configuration files (DB connection, environment setup)\
│ ├── controllers/ # Business logic for each route\
│ ├── middleware/ # JWT authentication middleware\
│ ├── models/ # Mongoose schemas (User, RecyclingRequest, etc.)\
│ ├── routes/ # API route definitions\
│ ├── mail.js # Handles email sending via Resend\
│ └── server.js # Main entry point of the application\
│\
├── .env.example # Example environment variables\
├── package.json # Project dependencies and scripts\
└── README.md # Project documentation\

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following keys:
```bash
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

---

## 🧩 Setup & Installation

Follow these steps to run the project locally:

1. **Clone the repository**
```bash
git clone https://github.com/SambhavJI/Waste-Management.git
cd Waste-Management
```
2. **Install dependencies**
```bash
npm install
```
3. **Configure environment variables**
Create a `.env` file in the root directory with your credentials.

4. **Start the development server**
```bash
node src/server.js
```
The server runs by default at [http://localhost:3000](http://localhost:3000).

---

## 🔒 Authentication Workflow

1. User registers → password is hashed using **bcrypt**.  
2. On login → a **JWT token** is issued.  
3. For protected routes → the token is validated via **auth middleware**.  
4. Requests without valid tokens return **401 Unauthorized**.

---

## 📧 Support

For any issues or contributions, please open an issue in the repository or contact the maintainer.

---

**Maintainer:** [SambhavJI](https://github.com/SambhavJI)

