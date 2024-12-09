import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const LoginAuth = () => {
    // State to handle form input values and error messages
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    // Initialize navigation hook
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        console.log("Starting form validation");
        const newErrors = {};

        // Validate phone number or email
        const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

        console.log("Current input:", { phoneOrEmail, password });

        if (!phoneOrEmail) {
            newErrors.phoneOrEmail = "Phone number or email is required";
            console.log("Validation Error: Phone/Email is empty");
        } else if (!phoneRegex.test(phoneOrEmail) && !emailRegex.test(phoneOrEmail)) {
            newErrors.phoneOrEmail = "Enter a valid phone number (10 digits) or email";
            console.log("Validation Error: Invalid phone/email format");
        }

        // Validate password (alphanumeric, 6-8 characters)
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/; // Alphanumeric, 6-8 characters
        if (!password) {
            newErrors.password = "Password is required";
            console.log("Validation Error: Password is empty");
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be alphanumeric and between 6-8 characters";
            console.log("Validation Error: Invalid password format");
        }

        console.log("Validation Errors:", newErrors);
        setErrors(newErrors);

        // Return false if there are validation errors
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setSuccessMessage(""); // Clear any success message
    
        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: phoneOrEmail.includes('@') ? phoneOrEmail : null,
                        phone: !phoneOrEmail.includes('@') ? phoneOrEmail : null,
                        password,
                    }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Login successful, navigating to dashboard");
                    setSuccessMessage("Login successful!");
                    navigate('/dashboard');
                } else {
                    const errorData = await response.json();
                    setErrors({
                        submit: errorData.message || "Login failed. Please try again.",
                    });
                }
            } catch (error) {
                setErrors({
                    submit: "An error occurred during login. Please try again later.",
                });
            }
        }
    };     

    // Handle input change and remove error message
    const handleInputChange = (e, field) => {
        const { value } = e.target;
        console.log(`Input change: ${field} = ${value}`);

        if (field === "phoneOrEmail") {
            setPhoneOrEmail(value);
            if (value) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.phoneOrEmail;
                    console.log("Updated errors after phone/email input:", newErrors);
                    return newErrors;
                });
            }
        } else if (field === "password") {
            setPassword(value);
            if (value) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.password;
                    console.log("Updated errors after password input:", newErrors);
                    return newErrors;
                });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Log in</h2>
                {successMessage && <p className="success">{successMessage}</p>}
                {errors.submit && <p className="error">{errors.submit}</p>}
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
                    <div>
                        <button className="google-btn">Instagram</button>
                        <button className="facebook-btn">Facebook</button>
                        <button className="twitter-btn">Twitter</button>
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default LoginAuth;