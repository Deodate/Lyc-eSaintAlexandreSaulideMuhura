package com.lyceeSaintAlexandre.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lyceeSaintAlexandre.Backend.model.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    // Check if a user exists by phone number
    Optional<User> findByPhone(String phone);
    // Check if a user exists by email
    Optional<User> findByEmail(String email);
    
    // New method to find user by email or phone and password
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByPhoneAndPassword(String phone, String password);

}
