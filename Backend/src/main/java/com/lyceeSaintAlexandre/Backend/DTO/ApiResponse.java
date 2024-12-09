package com.lyceeSaintAlexandre.Backend.DTO;

import org.springframework.http.HttpStatus;

public class ApiResponse<T> {
    private HttpStatus statusCode;
    private String message;
    private T data;

    public ApiResponse(HttpStatus statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    // Getters and setters
    public HttpStatus getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(HttpStatus statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
