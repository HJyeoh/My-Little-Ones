# Express.js + Firebase Backend Setup

## Prerequisites
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database and Storage
3. Generate a service account key

## Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Firebase:**
   - Replace `firebase-service-account.json` with your actual service account key
   - Update `.env` file with your Firebase project details

3. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints
- POST `/signup` - User registration
- POST `/login` - User authentication
- POST `/upload` - File upload to Firebase Storage
- POST `/createproduct` - Create new product
- GET `/showproduct` - Get all products
- POST `/removeproduct` - Delete product
- POST `/addtocart` - Add item to cart
- POST `/removefromcart` - Remove item from cart
- POST `/getcart` - Get user cart

## Database Structure
- `users` collection: user data and cart items
- `products` collection: product information