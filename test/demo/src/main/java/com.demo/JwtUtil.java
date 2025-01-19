package com.demo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {
    // Use a secure, randomly generated secret key for HS256
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate a JWT token
    public static String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)  // Set the userId as the subject
                .setIssuedAt(new Date())  // Set the token creation date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // Expiry: 10 hours
                .signWith(SECRET_KEY)  // Sign with the secure generated key
                .compact();
    }

    // Verify and decode a JWT token
    public static Claims verifyToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)  // Use the secure key for verification
                .build()
                .parseClaimsJws(token)  // Parse the token
                .getBody();  // Extract claims
    }
}
