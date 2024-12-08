package com.lyceeSaintAlexandre.Backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    // Renaming this method to sendEmail
    public void sendEmail(String to, String resetCode, String subject) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("ajadeo04@gmail.com");  // Ideally, fetch this from configuration
        message.setTo(to);
        message.setSubject(subject);
        message.setText("Your password reset code is: " + resetCode);
        mailSender.send(message);
    }
}