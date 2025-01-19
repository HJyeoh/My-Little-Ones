package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList; // <-- Add this import
import com.google.gson.Gson;

public class ShowAllProductServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type to JSON
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");

        try {
            // Get the MongoDB database
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> collection = database.getCollection("products");

            // Fetch all products from the collection
            List<Document> products = collection.find().into(new ArrayList<>());  // <-- Ensure ArrayList is imported

            // Convert products to JSON using Gson
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(products);

            // Send the JSON response
            response.getWriter().write(jsonResponse);
        } catch (Exception e) {
            // Handle errors
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Failed to fetch products\"}");
        }
    }
}
