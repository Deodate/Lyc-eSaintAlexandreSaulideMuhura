package com.lyceeSaintAlexandre.Backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.lyceeSaintAlexandre.Backend.config.ForgotPasswordRequestDTO;
import com.lyceeSaintAlexandre.Backend.config.JwtTokenUtil;
import com.lyceeSaintAlexandre.Backend.model.User;
import com.lyceeSaintAlexandre.Backend.config.EmailService;
import com.lyceeSaintAlexandre.Backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmailService emailService;

    private String generateResetCode() {
        Random random = new Random();
        int code = random.nextInt(999999);
        return String.format("%06d", code);
    }

    @GetMapping("/validate")
    public ResponseEntity<String> validateUser(@RequestParam(value = "phone", required = false) String phone,
                                               @RequestParam(value = "email", required = false) String email) {
        try {
            logger.info("Validating user with phone: {} and email: {}", phone, email);

            if (phone != null && userRepository.findByPhone(phone).isPresent()) {
                logger.warn("Phone number already in use: {}", phone);
                return ResponseEntity.status(400).body("Phone number is already in use.");
            }

            if (email != null && userRepository.findByEmail(email).isPresent()) {
                logger.warn("Email already in use: {}", email);
                return ResponseEntity.status(400).body("Email is already in use.");
            }

            return ResponseEntity.status(200).body("Available");
        } catch (Exception e) {
            logger.error("Error checking availability", e);
            return ResponseEntity.status(400).body("Error checking availability: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> newUser(@RequestBody User newUser) {
        try {
            logger.info("Creating new user with email: {} and phone: {}", newUser.getEmail(), newUser.getPhone());

            if (userRepository.findByPhone(newUser.getPhone()).isPresent()) {
                logger.warn("Phone number already in use: {}", newUser.getPhone());
                return ResponseEntity.status(400).body("Phone number is already in use.");
            }

            if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
                logger.warn("Email already in use: {}", newUser.getEmail());
                return ResponseEntity.status(400).body("Email is already in use.");
            }

            User savedUser = userRepository.save(newUser);
            logger.info("User created successfully with ID: {}", savedUser.getId());
            return ResponseEntity.status(201).body(savedUser);
        } catch (Exception e) {
            logger.error("Error saving user", e);
            return ResponseEntity.status(400).body("Error saving user: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            logger.info("User login attempt with email: {} or phone: {}", loginRequest.getEmail(), loginRequest.getPhone());

            if ((loginRequest.getEmail() == null && loginRequest.getPhone() == null) || loginRequest.getPassword() == null) {
                logger.warn("Invalid login credentials");
                return ResponseEntity.badRequest()
                        .body(new LoginResponseDTO("Invalid login credentials", null, null, null));
            }

            String hashedPassword = User.hashWithMD5(loginRequest.getPassword());
            User user = null;

            if (loginRequest.getEmail() != null) {
                user = userRepository.findByEmailAndPassword(loginRequest.getEmail(), hashedPassword).orElse(null);
            }

            if (user == null && loginRequest.getPhone() != null) {
                user = userRepository.findByPhoneAndPassword(loginRequest.getPhone(), hashedPassword).orElse(null);
            }

            if (user == null) {
                logger.warn("Invalid credentials for email or phone: {}", loginRequest.getEmail() != null ? loginRequest.getEmail() : loginRequest.getPhone());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new LoginResponseDTO("Invalid email or password", null, null, null));
            }

            String token = jwtTokenUtil.generateToken(user.getEmail());
            logger.info("User logged in successfully with ID: {}", user.getId());

            return ResponseEntity.ok(
                    new LoginResponseDTO("Login successful", user.getId(), user.getFullName(), token));

        } catch (Exception e) {
            logger.error("Login error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponseDTO("Login error", null, null, null));
        }
    }

    @PostMapping("/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
    try {
        logger.info("Forgot password request for email: {} or phone: {}", request.getEmail(), request.getPhone());

        Optional<User> userOptional = Optional.empty();
        if (request.getEmail() != null) {
            userOptional = userRepository.findByEmail(request.getEmail());
        } else if (request.getPhone() != null) {
            userOptional = userRepository.findByPhone(request.getPhone());
        }

        if (userOptional.isEmpty()) {
            logger.warn("User not found for email or phone: {}", request.getEmail() != null ? request.getEmail() : request.getPhone());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOptional.get();

        // Generate reset code
        String resetCode = generateResetCode();
        logger.info("Generated reset code for user ID: {}", user.getId());

        // Send reset code to the user's email
        String emailSubject = "Password Reset Request";
        String emailBody = "Your password reset code is: " + resetCode;
        emailService.sendEmail(user.getEmail(), emailSubject, emailBody);

        // Optionally save reset code in the database if needed

        logger.info("Password reset email sent to: {}", user.getEmail());
        return ResponseEntity.ok("Password reset email sent successfully.");
    } catch (Exception e) {
        logger.error("Error processing forgot password request", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request.");
    }
}

@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody ForgotPasswordRequestDTO request) {
    try {
        logger.info("Password reset attempt for user with email: {} or phone: {}", request.getEmail(), request.getPhone());

        // Validate reset code
        Optional<User> userOptional = Optional.empty();
        if (request.getEmail() != null) {
            userOptional = userRepository.findByEmail(request.getEmail());
        } else if (request.getPhone() != null) {
            userOptional = userRepository.findByPhone(request.getPhone());
        }

        if (userOptional.isEmpty()) {
            logger.warn("User not found for email or phone: {}", request.getEmail() != null ? request.getEmail() : request.getPhone());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOptional.get();

        // Check if the reset code matches the one sent to the user
        // You may want to save the reset code temporarily in the database or use an alternative approach
        if (!request.getResetCode().equals(user.getResetCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reset code.");
        }

        // Reset the password
        String hashedNewPassword = User.hashWithMD5(request.getNewPassword());
        user.setPassword(hashedNewPassword);
        userRepository.save(user);

        logger.info("Password reset successfully for user ID: {}", user.getId());
        return ResponseEntity.ok("Password reset successfully.");
    } catch (Exception e) {
        logger.error("Error resetting password", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password.");
    }
}

}
