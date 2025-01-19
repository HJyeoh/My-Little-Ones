package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.UUID;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SignupServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain");
        try {
            // Get the MongoDB database
            MongoDatabase database = MongoDBUtil.getDatabase();

            // Insert a test document into a "test_collection"
            MongoCollection<Document> collection = database.getCollection("test");
            Document testDoc = new Document("message", "MongoDB connection is working!")
                    .append("timestamp", System.currentTimeMillis());
            collection.insertOne(testDoc);

            // Respond with success message
            response.getWriter().write("MongoDB connection successful! Test document inserted.");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("MongoDB connection failed: " + e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");

        try {
            // Get form data from request
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String password = request.getParameter("password");

            // Validate input
            if (name == null || name.isEmpty() || email == null || email.isEmpty() || password == null || password.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Missing or invalid required fields\"}");
                return;
            }

            // Generate a unique user ID (you can use UUID or any method to generate unique IDs)
            String userId = UUID.randomUUID().toString();

            // Hash the password
            String hashedPassword = hashPassword(password);

            // Initialize cartData with default values
            Document cartData = new Document();
            for (int i = 0; i < 300; i++) {
                cartData.put(String.valueOf(i), 0);
            }

            // Get MongoDB database
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> collection = database.getCollection("users");

            // Check if the email is already registered
            if (collection.find(new Document("email", email)).first() != null) {
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                response.getWriter().write("{\"error\": \"Email is already registered\"}");
                return;
            }

            // Create a new user document
            Document userDoc = new Document("userId", userId) // Add userId field
                    .append("name", name)
                    .append("email", email)
                    .append("password", hashedPassword)
                    .append("cartData", cartData)
                    .append("date", System.currentTimeMillis());
            collection.insertOne(userDoc);

            // Generate JWT token using userId instead of email
            String token = JwtUtil.generateToken(userId);

            // Respond with success and JWT token
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"User registered successfully!\", \"token\": \"" + token + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Error: " + e.getMessage() + "\"}");
        }
    }


    // Utility method to hash passwords
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashedBytes = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hashedBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
