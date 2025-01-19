package com.demo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.io.IOException;

public class GetCartServlet extends HttpServlet {
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
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, auth-token");
        response.setContentType("application/json");

        try {
            // Get the user email from the request parameters
            String userEmail = request.getParameter("user_email");

            // MongoDB interaction to retrieve cart data
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> usersCollection = database.getCollection("users");

            // Find user by email
            Document user = usersCollection.find(new Document("email", userEmail)).first();
            if (user == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"User not found.\"}");
                return;
            }

            // Get the cart data from the user's document
            Document cartData = (Document) user.get("cartData");

            if (cartData == null) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"cartData\": {}}"); // If no cart data, send an empty cart
            } else {
                // Return the cart data in the response
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(cartData.toJson());
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"An error occurred: " + e.getMessage() + "\"}");
        }
    }
}
