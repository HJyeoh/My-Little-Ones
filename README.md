# My Little Ones - E-commerce for Pregnancy Products

## 📖 Overview

**My Little Ones** is an eCommerce platform for pregnancy-related products. The project consists of a **React frontend** and a **Java Servlet backend** running on **Tomcat** with **MongoDB** as the database.

---

## 📂 Project Structure

```sh
/My-Little-Ones   # Frontend (React + TailwindCSS)
/test/demo        # Backend (Java Servlet on Tomcat, MongoDB)
```

## 👤 User Roles & Authentication

### 🔹 Admin

- Can add and delete products.
- Uses the following credentials:
- Email: admin@gmail.com
- Password: 123456

### 🔹 Regular User

- Can browse, select items, write reviews, and make payments.
- Must register before logging in.

### 🔹 Login & Registration

- Both admin and users use the same login page.
- New users must sign up first before accessing the platform.

## 🚀 Frontend Setup

```sh
# Navigate to the frontend directory
cd My-Little-Ones

# Install dependencies
npm install

# Start the development server
npm run dev
```

- The frontend will run at : http://localhost:5173

## 🛠 Backend Setup

- Apache Tomcat (installed & configured)
- Apache Maven (installed)
- VS Code Extension: Install "Community Server Connector" to deploy the Tomcat server

### 🚀 Deployment (Only if Changes Occur)

```sh
# Navigate to the backend directory
cd test/demo

# Build and install the project
mvn clean install
```

## ⚠️ Image Storage Notice

- Images are stored inside the Tomcat server.
- ⚠ Images will be lost when redeploying the backend.
- **Improvement** : using an external storage service (Firebase Storage) for permanent storage.
