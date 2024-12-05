package com.lyceeSaintAlexandre.Backend.model;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String nationality;

    @Column(nullable = false)
    private String password;

    // Method to hash the password using MD5
    @PrePersist
    private void hashPassword() {
        if (this.password != null) {
            this.password = hashWithMD5(this.password);
        }
    }

    // MD5 hashing method
    private String hashWithMD5(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString(); // Return the MD5 hash as a hexadecimal string
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}
