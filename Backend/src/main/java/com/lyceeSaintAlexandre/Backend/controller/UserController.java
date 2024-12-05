package com.lyceeSaintAlexandre.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lyceeSaintAlexandre.Backend.DTO.LoginRequestDTO;
import com.lyceeSaintAlexandre.Backend.model.User;
import com.lyceeSaintAlexandre.Backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/validate")
    public ResponseEntity<String> validateUser(@RequestParam(value = "phone", required = false) String phone, 
                                               @RequestParam(value = "email", required = false) String email) {
        try {
            if (phone != null && userRepository.findByPhone(phone).isPresent()) {
                return ResponseEntity.status(400).body("Phone number is already in use.");
            }

            if (email != null && userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(400).body("Email is already in use.");
            }

            return ResponseEntity.status(200).body("Available");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error checking availability: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        try {
            // Check if phone or email already exists
            if (userRepository.findByPhone(newUser.getPhone()).isPresent()) {
                return ResponseEntity.status(400).body("Phone number is already in use.");
            }

            if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
                return ResponseEntity.status(400).body("Email is already in use.");
            }

            // Save the new user to the database
            User savedUser = userRepository.save(newUser);
            return ResponseEntity.status(201).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error saving user: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            // Hash the password using MD5 for comparison
            String hashedPassword = User.hashWithMD5(loginRequest.getPassword());

            // Try to find user by email and password
            User user = userRepository.findByEmailAndPassword(loginRequest.getEmail(), hashedPassword)
                .orElse(null);

            // If not found by email, try by phone
            if (user == null) {
                user = userRepository.findByPhoneAndPassword(loginRequest.getPhone(), hashedPassword)
                    .orElse(null);
            }

            if (user == null) {
                return ResponseEntity.status(400).body("Invalid credentials.");
            }

            // Login successful
            return ResponseEntity.ok(new Object());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during login: " + e.getMessage());
        }
    }
}
