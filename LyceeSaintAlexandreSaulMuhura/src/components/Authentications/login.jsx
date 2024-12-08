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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setSuccessMessage(""); // Clear any success message
    
        // Validate the form before making the request
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
                    // Handle successful login
                    const data = await response.json();
                    
                    // Store the authentication token
                    localStorage.setItem('authToken', data.token || 'default-token');
                    
                    setSuccessMessage("Login successful!");
                    console.log('Login Response:', data);
                    
                    // Navigate to DashboardLayout after successful login
                    navigate('/dashboard');
                } else {
                    const errorData = await response.json();
                    setErrors({
                        submit: errorData.message || "Login failed. Please try again.",
                    });
                    console.error('Login Error:', errorData);
                }
            } catch (error) {
                // Handle any errors that occur during the request
                setErrors({
                    submit: "An error occurred during login. Please try again later.",
                });
                console.error('Login Request Error:', error);
            }
        } else {
            console.log("Validation failed. Check errors.");
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
                 {/* Display success message here */}
                {successMessage && <p className="success">{successMessage}</p>}
                {errors.submit && <p className="error">{errors.submit}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <label htmlFor="phoneOrEmail">Phone Number or Email</label> */}
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