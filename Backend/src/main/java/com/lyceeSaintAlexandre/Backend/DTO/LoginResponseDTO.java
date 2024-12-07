package com.lyceeSaintAlexandre.Backend.DTO;

import java.util.UUID;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private String message;
    private UUID userId;  // Change Long to UUID
    private String fullName;
    private String token;

    public LoginResponseDTO(String message, UUID userId, String fullName, String token) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.token = token;
    }
}
