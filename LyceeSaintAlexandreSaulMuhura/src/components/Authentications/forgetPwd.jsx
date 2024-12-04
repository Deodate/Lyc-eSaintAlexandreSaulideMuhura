import React, { useState } from "react";
import './index.css';

const ForgetPwdAuth = () => {
    // State to handle form input values and error messages
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate phone number or email
        const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

        if (!phoneOrEmail) {
            newErrors.phoneOrEmail = "Phone number or email is required";
        } else if (!phoneRegex.test(phoneOrEmail) && !emailRegex.test(phoneOrEmail)) {
            newErrors.phoneOrEmail = "Enter a valid phone number (10 digits) or email";
        }

        setErrors(newErrors);

        // Return false if there are validation errors
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from submitting

        if (validateForm()) {
            // Handle successful form submission (e.g., API call, redirect)
            console.log("Form submitted:", { phoneOrEmail });
        }
    };

    // Handle input change and remove error message
    const handleInputChange = (e) => {
        const { value } = e.target;
        setPhoneOrEmail(value);

        if (value) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors.phoneOrEmail;
                return newErrors;
            });
        }
    };

    // Helper function to determine input field style
    const getInputStyle = () => {
        if (errors.phoneOrEmail) {
            return "input-error"; // Red border if error exists
        } else if (phoneOrEmail) {
            return "input-success"; // Green border if input is valid
        }
        return ""; 
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-box">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="phoneOrEmail">Phone Number or Email</label>
                        <input
                            type="text"
                            id="phoneOrEmail"
                            placeholder="Enter your phone or email"
                            value={phoneOrEmail}
                            onChange={handleInputChange}
                            className={getInputStyle()} 
                        />
                        {errors.phoneOrEmail && <p className="error">{errors.phoneOrEmail}</p>}
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="reset-btn">Reset Password</button>
                    </div>
                </form>
                <div className="links">
                    <a href="/LoginAuth">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgetPwdAuth;
