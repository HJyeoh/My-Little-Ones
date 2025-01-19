package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.HashMap;
import java.util.Map;

public class Users {

    private static final MongoDatabase database = MongoDBUtil.getDatabase();
    private static final MongoCollection<Document> collection = database.getCollection("users");

    // Method to create a default cart
    private static Map<String, Integer> createDefaultCart() {
        Map<String, Integer> cart = new HashMap<>();
        for (int i = 0; i < 300; i++) {
            cart.put(String.valueOf(i), 0);
        }
        return cart;
    }

    // Method to insert a new user into the database
    public static boolean createUser(String name, String email, String password) {
        try {
            // Check if the user already exists
            Document existingUser = collection.find(new Document("email", email)).first();
            if (existingUser != null) {
                return false; // User already exists
            }

            // Create the new user document
            Map<String, Integer> cart = createDefaultCart();
            Document user = new Document("name", name)
                    .append("email", email)
                    .append("password", password)
                    .append("cartData", cart)
                    .append("date", System.currentTimeMillis());

            // Insert into the database
            collection.insertOne(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Failure
        }
    }

    // Method to find a user by email
    public static Document findUserByEmail(String email) {
        try {
            return collection.find(new Document("email", email)).first();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Failure
        }
    }

    // Method to validate user login
    public static boolean validateLogin(String email, String password) {
        try {
            Document user = findUserByEmail(email);
            return user != null && user.getString("password").equals(password);
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Failure
        }
    }
}
