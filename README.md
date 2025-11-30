## My Little Ones - E-commerce for Pregnancy Products

### 📖 Overview

**My Little Ones** is an eCommerce platform for pregnancy-related products. The project consists of a **React frontend** and an **Express.js backend** with **Firebase** as the database.

---

### 📂 Project Structure

```sh
/My-Little-Ones   # Frontend (React + TailwindCSS)
/backend          # Backend (Express.js + Firebase)
```

### 👤 User Roles & Authentication

#### 🔹 Admin

- Can add and delete products.
- Uses the following credentials:
- Email: admin@gmail.com
- Password: 123456

#### 🔹 Regular User

- Can browse, select items, write reviews, and make payments.
- Must register before logging in.

#### 🔹 Login & Registration

- Both admin and users use the same login page.
- New users must sign up first before accessing the platform.

### 🚀 Frontend Setup

```sh
# Navigate to the frontend directory
cd My-Little-Ones

# Install dependencies
npm install

# Start the development server
npm run dev
```

- The frontend will run at : http://localhost:5173

### 🛠 Backend Setup

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

- The backend will run at: http://localhost:8000

### 🔥 Firebase Configuration

- Images are stored in Firebase Storage (permanent storage)
- User data and products are stored in Firestore Database
