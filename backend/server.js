const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = 8000;

// Initialize Firebase Admin
const serviceAccount = require("./firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Routes
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").doc(email).set({
      name,
      email,
      password: hashedPassword,
      cart: {},
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ message: "User created successfully", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await db.collection("users").doc(email).get();

    if (!userDoc.exists) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = userDoc.data();
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileName = `products/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    await fileUpload.makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    res.json({ url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/createproduct", async (req, res) => {
  try {
    const { name, category, image, new_price, description } = req.body;

    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();
    const id = snapshot.size + 1;

    await productsRef.doc(id.toString()).set({
      id,
      name,
      category,
      photo: image,
      new_price: parseFloat(new_price),
      description,
    });

    res.json({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/showproduct", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => doc.data());
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/removeproduct", async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection("products").doc(id).delete();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/addtocart", async (req, res) => {
  try {
    const { product_id, user_email } = req.body;
    const userRef = db.collection("users").doc(user_email);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const cart = userDoc.data().cart || {};
      cart[product_id] = (cart[product_id] || 0) + 1;
      await userRef.update({ cart });
    }

    res.json({ message: "Added to cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/removefromcart", async (req, res) => {
  try {
    const { product_id, user_email } = req.body;
    const userRef = db.collection("users").doc(user_email);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const cart = userDoc.data().cart || {};
      if (cart[product_id] > 0) {
        cart[product_id] -= 1;
        await userRef.update({ cart });
      }
    }

    res.json({ message: "Removed from cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/getcart", async (req, res) => {
  try {
    const { user_email } = req.body;
    const userDoc = await db.collection("users").doc(user_email).get();

    if (userDoc.exists) {
      res.json(userDoc.data().cart || {});
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
