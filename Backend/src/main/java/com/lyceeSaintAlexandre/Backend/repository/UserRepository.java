package com.lyceeSaintAlexandre.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lyceeSaintAlexandre.Backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods can be added here
}
