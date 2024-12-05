package com.lyceeSaintAlexandre.Backend.DTO;

import java.util.UUID;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private String message;
    private UUID userId;
    private String fullName;

    public LoginResponseDTO(String message, UUID userId, String fullName) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
    }
}
