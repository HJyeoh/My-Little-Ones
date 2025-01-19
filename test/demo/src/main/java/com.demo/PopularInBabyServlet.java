package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoClients;
import org.bson.Document;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@WebServlet("/PopularInBabyServlet")
public class PopularInBabyServlet extends HttpServlet {

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

            // Fetch products from category "boy_clothes" (adjust the query based on your actual MongoDB structure)
            List<Document> products = collection.find(new Document("category", "boy_clothes")).into(new ArrayList<>());

            // Get the first 4 products
            List<Document> popularInBaby = getPopularInBaby(products);

            // Convert the list of documents into a list of maps (JSON objects)
            List<Object> jsonResponse = popularInBaby.stream()
                                                     .map(doc -> docToMap(doc))
                                                     .collect(Collectors.toList());

            // Send the response back to the client
            response.getWriter().write(new Gson().toJson(jsonResponse));
            System.out.println("Popular in Baby fetched");

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\": \"Error fetching data\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }

    private List<Document> getPopularInBaby(List<Document> products) {
        // Get the first 4 products (popular in baby)
        if (products.size() > 4) {
            return products.subList(0, 4); // Get the first 4 products
        }
        return products; // Return all if there are less than 4
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
