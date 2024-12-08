package com.lyceeSaintAlexandre.Backend.config;

public class ForgotPasswordRequestDTO {
    private String email;
    private String phone;
    private String resetCode;
    private String newPassword;

    // Constructors
    public ForgotPasswordRequestDTO() {}

    public ForgotPasswordRequestDTO(String email, String phone, String resetCode, String newPassword) {
        this.email = email;
        this.phone = phone;
        this.resetCode = resetCode;
        this.newPassword = newPassword;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getResetCode() {
        return resetCode;
    }

    public void setResetCode(String resetCode) {
        this.resetCode = resetCode;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}