package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class RemoveProductServlet extends HttpServlet {

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
        response.setContentType("application/json");  // Set response content type to JSON

        try {
            // Get form data from request
            String id = request.getParameter("id");

            // Validate the input
            if (id == null || id.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Missing or invalid product ID\"}");
                return;
            }

            // Get MongoDB database
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> collection = database.getCollection("products");

            // Find and delete the product by ID
            Document productToDelete = collection.findOneAndDelete(new Document("id", Integer.parseInt(id)));

            // Check if product was found and deleted
            if (productToDelete != null) {
                // Respond with success
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"success\":true, \"name\":\"" + productToDelete.getString("name") + "\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"error\":\"Product not found\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
