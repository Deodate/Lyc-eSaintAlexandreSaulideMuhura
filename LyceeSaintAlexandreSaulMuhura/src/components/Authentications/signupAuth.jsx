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

    const validateForm = () => {
        const newErrors = {};

        // Validate Full Name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (formData.fullName.trim().split(" ").filter(word => word).length < 2) {
            newErrors.fullName = "Full Name must contain at least two words";
        }

        // Validate Gender
        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        // Validate Phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        // Validate Position
        if (!formData.position) {
            newErrors.position = "Position is required";
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        // Validate Nationality
        if (!formData.nationality.trim()) {
            newErrors.nationality = "Nationality is required";
        }

        // Validate Password
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/;
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be alphanumeric and between 6-8 characters";
        }

        // Validate Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === "fullName") {
            const isValid = value.trim().split(" ").filter(word => word).length >= 2;
            const input = document.getElementById("full-name");
            if (isValid) {
                input.classList.add("valid");
                input.classList.remove("invalid");
            } else {
                input.classList.add("invalid");
                input.classList.remove("valid");
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className="input-group">
                        <label>Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Position</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Staff">Staff</option>
                            <option value="Headmaster">Headmaster</option>
                        </select>
                        {errors.position && <p className="error">{errors.position}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            placeholder="Enter your nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                        />
                        {errors.nationality && <p className="error">{errors.nationality}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupAuth;
