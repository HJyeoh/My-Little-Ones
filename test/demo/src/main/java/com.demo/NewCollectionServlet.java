package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoClients;
import org.bson.Document;
import org.bson.conversions.Bson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@WebServlet("/NewCollectionServlet")
public class NewCollectionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Connect to MongoDB
            MongoDatabase database = MongoDBUtil.getDatabase();
            MongoCollection<Document> collection = database.getCollection("products");

            // Fetch all products (example)
            List<Document> products = collection.find().into(new ArrayList<>());

            // Simulate a slice operation like JavaScript's Array.slice
            List<Document> newCollection = getNewCollection(products);

            // Convert the list of documents into a list of maps (JSON objects)
            List<Object> jsonResponse = newCollection.stream()
                                                     .map(doc -> docToMap(doc))
                                                     .collect(Collectors.toList());

            // Send the response back to the client
            response.getWriter().write(new com.google.gson.Gson().toJson(jsonResponse));
            System.out.println("New Collection fetched");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\": \"Error fetching data\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }

    private List<Document> getNewCollection(List<Document> products) {
        // Slice operation: get all products except the first one, then slice the last 8
        if (products.size() > 1) {
            List<Document> newCollection = products.subList(1, products.size());
            int start = Math.max(0, newCollection.size() - 8);
            return newCollection.subList(start, newCollection.size());
        }
        return new ArrayList<>();
    }

    private static java.util.Map<String, Object> docToMap(Document doc) {
        // Convert the Document to a map (MongoDB fields to JSON object)
        return doc.entrySet().stream()
                  .collect(Collectors.toMap(
                      e -> e.getKey(), 
                      e -> e.getValue()
                  ));
    }
}
