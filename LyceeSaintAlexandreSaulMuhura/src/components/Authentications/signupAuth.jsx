import React, { useState } from "react";
import './index.css';


const SignupAuth = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        phone: "",
        position: "",
        email: "",
        nationality: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [validity, setValidity] = useState({});
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const validateField = (name, value) => {
        let error = "";
        let isValid = false;

        switch (name) {
            case "fullName":
                isValid = value.split(" ").filter(word => word).length >= 2;
                error = isValid ? "" : "Full Name must contain at least two words.";
                break;
            case "phone":
                isValid = /^[0-9]{10}$/.test(value);
                error = isValid ? "" : "Phone number must be 10 digits.";
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                error = isValid ? "" : "Enter a valid email address.";
                break;
            case "password":
                isValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/.test(value);
                error = isValid ? "" : "Password must be alphanumeric and 6-8 characters.";
                break;
            case "confirmPassword":
                isValid = value === formData.password;
                error = isValid ? "" : "Passwords do not match.";
                break;
            case "nationality":
                isValid = value.trim() !== "";
                error = isValid ? "" : "Nationality is required.";
                break;
            case "gender":
                isValid = value !== "";
                error = isValid ? "" : "Gender is required.";
                break;
            case "position":
                isValid = value !== "";
                error = isValid ? "" : "Position is required.";
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        setValidity(prev => ({ ...prev, [name]: isValid }));
    };

    const checkAvailability = async (field, value) => {
        if (field === "phone" || field === "email") {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/validate?${field}=${value}`);
                const data = await response.text();
                if (response.status === 400) {
                    setValidationMessage(data);  // Show error message from backend
                } else {
                    setValidationMessage("");  // Clear any validation message
                }
            } catch (error) {
                console.error("Error checking availability:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
        checkAvailability(name, value);  // Check if the phone or email is available
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        setSuccessMessage("");
    
        const formIsValid = Object.values(validity).every(value => value === true) && Object.values(errors).every(error => error === "");
    
        if (formIsValid) {
            try {
                const response = await fetch("http://localhost:8080/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    setSuccessMessage("User registered successfully!");
                    setFormData({
                        fullName: "",
                        gender: "",
                        phone: "",
                        position: "",
                        email: "",
                        nationality: "",
                        password: "",
                        confirmPassword: "",
                    });
                } else {
                    const errorData = await response.json();
                    setApiError(errorData.message || "Failed to register user.");
                }
            } catch (error) {
                setApiError("Email or Mobile Phone has been used!.");
            }
        } else {
            console.log("Validation failed. Check errors.");
        }
    };

    

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    {successMessage && <p className="success">{successMessage}</p>}
                    {apiError && <p className="error">{apiError}</p>}
                    {/* Full Name */}
                    <div className="input-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={validity.fullName ? "valid" : "invalid"}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>

                    {/* Gender */}
                    <div className="input-group">
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={validity.gender ? "valid" : "invalid"}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>

                    {/* Phone */}
                    <div className="input-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={validity.phone ? "valid" : "invalid"}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    {/* Position */}
                    <div className="input-group">
                        <label>Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className={validity.position ? "valid" : "invalid"}
                        >
                            <option value="">Select Position</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Staff">Staff</option>
                            <option value="Headmaster">Headmaster</option>
                        </select>
                        {errors.position && <p className="error">{errors.position}</p>}
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={validity.email ? "valid" : "invalid"}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {/* Nationality */}
                    <div className="input-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            placeholder="Enter your nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className={validity.nationality ? "valid" : "invalid"}
                        />
                        {errors.nationality && <p className="error">{errors.nationality}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={validity.password ? "valid" : "invalid"}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={validity.confirmPassword ? "valid" : "invalid"}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="login-btn">Submit</button>
                        <a className="link-btn" href="/LoginAuth">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupAuth;
