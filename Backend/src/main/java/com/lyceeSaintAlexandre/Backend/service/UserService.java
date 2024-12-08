package com.lyceeSaintAlexandre.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lyceeSaintAlexandre.Backend.DTO.LoginRequestDTO;
import com.lyceeSaintAlexandre.Backend.DTO.LoginResponseDTO;
import com.lyceeSaintAlexandre.Backend.model.User;
import com.lyceeSaintAlexandre.Backend.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailOrPhone(username, username);
        
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email or phone: " + username);
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail() != null ? user.getEmail() : user.getPhone())
                .password(user.getPassword())
                .roles("USER") // Replace with dynamic roles if needed
                .build();
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequest) {
        // Validate input
        if (loginRequest == null || 
            (loginRequest.getEmail() == null && loginRequest.getPhone() == null)) {
            return new LoginResponseDTO("Invalid login credentials", null, null, null);
        }

        // Find user by email or phone
        User user = userRepository.findByEmailOrPhone(loginRequest.getEmail(), loginRequest.getPhone());
        
        if (user == null) {
            return new LoginResponseDTO("User not found", null, null, null);
        }

        // Use PasswordEncoder to match passwords
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Generate JWT or create login response
            return new LoginResponseDTO("Login successful", user.getId(), user.getFullName(), generateToken(user));
        } else {
            return new LoginResponseDTO("Invalid credentials", null, null, null);
        }
    }

    private String generateToken(User user) {
        // Implement your token generation logic
        return "mocked-jwt-token"; // Placeholder for demonstration
    }
}
