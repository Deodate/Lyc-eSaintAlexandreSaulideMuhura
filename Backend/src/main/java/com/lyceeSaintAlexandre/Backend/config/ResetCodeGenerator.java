package com.lyceeSaintAlexandre.Backend.config;

import java.util.UUID;

public class ResetCodeGenerator {
     public static String generateResetCode() {
        // Generates a unique reset code using UUID
        return "reset-code-" + UUID.randomUUID().toString();
    }
}
