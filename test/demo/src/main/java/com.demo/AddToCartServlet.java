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

public class AddToCartServlet extends HttpServlet {

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
        // CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, auth-token");
        response.setContentType("application/json");

        try {
            // Get email from request body
            String userEmail = request.getParameter("user_email");
            if (userEmail == null || userEmail.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"User email is missing.\"}");
                return;
            }

            // Fetch the user's record from MongoDB using the email
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> usersCollection = database.getCollection("users");
            Document user = usersCollection.find(new Document("email", userEmail)).first();

            if (user == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\": \"User not found.\"}");
                return;
            }

            // Parse product_id
            String productId = request.getParameter("product_id");
            if (productId == null || productId.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Product ID is missing.\"}");
                return;
            }

            // MongoDB interaction: update the user's cart
            Document cart = (Document) user.get("cartData");
            int currentQuantity = cart.containsKey(productId) ? ((Number) cart.get(productId)).intValue() : 0;
            cart.put(productId, currentQuantity + 1);

            // Update the user's cart in the database
            usersCollection.updateOne(new Document("email", userEmail), new Document("$set", new Document("cartData", cart)));

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Item added to cart.\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"An error occurred: " + e.getMessage() + "\"}");
        }
    }
}
