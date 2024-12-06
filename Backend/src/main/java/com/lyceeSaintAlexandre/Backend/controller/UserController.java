package com.lyceeSaintAlexandre.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lyceeSaintAlexandre.Backend.DTO.LoginRequestDTO;
import com.lyceeSaintAlexandre.Backend.DTO.LoginResponseDTO;
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
    List<User> getAllUsers() {
        return userRepository.findAll();
    }
@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
    try {
        // Validate input
        if ((loginRequest.getEmail() == null && loginRequest.getPhone() == null) 
            || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest()
                .body(new LoginResponseDTO("Invalid login credentials", null, null));
        }

        // Hash the password 
        String hashedPassword = User.hashWithMD5(loginRequest.getPassword());

        // Find user by email or phone
        User user = null;
        if (loginRequest.getEmail() != null) {
            user = userRepository.findByEmailAndPassword(loginRequest.getEmail(), hashedPassword)
                .orElse(null);
        }
        
        if (user == null && loginRequest.getPhone() != null) {
            user = userRepository.findByPhoneAndPassword(loginRequest.getPhone(), hashedPassword)
                .orElse(null);
        }

        // Check if user exists
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponseDTO("Invalid credentials", null, null));
        }

        // Successful login response
        return ResponseEntity.ok(
            new LoginResponseDTO(
                "Login successful", 
                user.getId(), 
                user.getFullName()
            )
        );

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new LoginResponseDTO("Login error", null, null));
    }
}
}
