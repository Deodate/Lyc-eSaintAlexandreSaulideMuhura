import React, { useState } from "react";
import './index.css';

const LoginAuth = () => {
    // State to handle form input values and error messages
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [password, setPassword] = useState("");
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

        // Validate password (alphanumeric, 6-8 characters)
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/; // Alphanumeric, 6-8 characters
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be alphanumeric and between 6-8 characters";
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
            console.log("Form submitted:", { phoneOrEmail, password });
        }
    };

    // Handle input change and remove error message
    const handleInputChange = (e, field) => {
        const { value } = e.target;

        if (field === "phoneOrEmail") {
            setPhoneOrEmail(value);
            if (value) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.phoneOrEmail;
                    return newErrors;
                });
            }
        } else if (field === "password") {
            setPassword(value);
            if (value) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.password;
                    return newErrors;
                });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="phoneOrEmail">Phone Number or Email</label>
                        <input
                            type="text"
                            id="phoneOrEmail"
                            placeholder="Enter your phone or email"
                            value={phoneOrEmail}
                            onChange={(e) => handleInputChange(e, "phoneOrEmail")}
                        />
                        {errors.phoneOrEmail && <p className="error">{errors.phoneOrEmail}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => handleInputChange(e, "password")}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="login-btn">Log in</button>
                        <a className="link-btn" href="/SignupAuth">Create new account</a>
                    </div>
                </form>
                <div className="links">
                    <a href="/ForgetPwdAuth">Forgot password?</a>
                </div>
                <div className="social-login">
                    <p>Connect with us </p>
                    <button className="google-btn">Instagram</button>
                    <button className="facebook-btn">Facebook</button>
                    <button className="twitter-btn">Twitter</button>
                </div>
            </div>
        </div>
    );
};

export default LoginAuth;
