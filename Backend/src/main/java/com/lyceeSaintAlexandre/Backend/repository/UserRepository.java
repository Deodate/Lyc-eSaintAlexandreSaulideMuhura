package com.lyceeSaintAlexandre.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.lyceeSaintAlexandre.Backend.model.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Check if a user exists by phone number
    Optional<User> findByPhone(String phone);

    // Check if a user exists by email
    Optional<User> findByEmail(String email);

    // Find a user by email and password
    Optional<User> findByEmailAndPassword(String email, String hashedPassword);

    // Find a user by phone and password
    Optional<User> findByPhoneAndPassword(String phone, String hashedPassword);

    // Find a user by email or phone
    User findByEmailOrPhone(String email, String phone);
}
