package com.lyceeSaintAlexandre.Backend.DTO;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String phone;
    private String password;
}
