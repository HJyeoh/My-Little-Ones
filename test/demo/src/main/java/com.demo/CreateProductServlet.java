package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CreateProductServlet extends HttpServlet {

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
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");

        try {
            // Extract form data from the URL-encoded request body
            String name = request.getParameter("name");
            String category = request.getParameter("category");
            String imageUrl = request.getParameter("image");
            double oldPrice = Double.parseDouble(request.getParameter("old_price"));
            double newPrice = Double.parseDouble(request.getParameter("new_price"));
            String description = request.getParameter("description"); // New field

            // Validate input
            if (name == null || category == null || imageUrl == null || description == null || oldPrice < 0 || newPrice <= 0) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Missing or invalid fields\"}");
                return;
            }

            // Get MongoDB database
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> collection = database.getCollection("products");

            // Find the last product and calculate the new product ID
            int id = 1; // Default ID if there are no products
            Document lastProduct = collection.find().sort(new Document("id", -1)).first(); // Sort by 'id' in descending order

            if (lastProduct != null) {
                id = lastProduct.getInteger("id") + 1; // Increment the last product's ID
            }

            // Create a new product document
            Document productDoc = new Document("id", id)
                    .append("name", name)
                    .append("image", imageUrl)
                    .append("category", category)
                    .append("new_price", newPrice)
                    .append("old_price", oldPrice)
                    .append("description", description) // Add description field
                    .append("available", true); // Assuming 'available' is true by default

            // Insert the product into the collection
            collection.insertOne(productDoc);

            // Respond with success in JSON format
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Product created successfully with ID: " + id + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Error occurred: " + e.getMessage() + "\"}");
        }
    }
}
