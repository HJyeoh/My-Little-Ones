package com.demo;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@MultipartConfig
public class UploadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "uploads"; // Directory under your app in webapps

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
            // Get the real path to the 'uploads' folder in the web application
            String uploadPath = getServletContext().getRealPath("/") + UPLOAD_DIR;

            // Ensure folder exists (create if not)
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();  // Make sure all necessary directories are created
            }

            // Process the uploaded file
            Part filePart = request.getPart("file"); // 'file' is the field name in the form
            String fileName = extractFileName(filePart);

            // Generate a unique filename to avoid overwriting
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            String filePath = uploadPath + File.separator + uniqueFileName;

            // Save the file on disk
            filePart.write(filePath);

            // Construct the relative file URL for the uploaded image
            String fileUrl = UPLOAD_DIR + "/" + uniqueFileName;

            // Optionally, store the image URL in MongoDB (if necessary)
            storeFileInDatabase(fileName, fileUrl);

            // Respond with the file URL (without localhost in the path)
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"File uploaded successfully\", \"url\": \"" + fileUrl + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\": \"File upload failed\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }

    private String extractFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        for (String content : contentDisposition.split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf("=") + 2, content.length() - 1);
            }
        }
        return null;
    }

    private void storeFileInDatabase(String fileName, String fileUrl) {
        MongoDatabase database = MongoDBUtil.getDatabase();
        MongoCollection<Document> collection = database.getCollection("images");

        Document imageDoc = new Document("fileName", fileName)
                .append("url", fileUrl)
                .append("uploadedAt", System.currentTimeMillis());

        collection.insertOne(imageDoc);
    }
}
