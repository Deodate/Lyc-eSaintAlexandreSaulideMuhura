import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./ChatAssistant.css";

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { sender: "user", text: inputValue }]);
            setInputValue("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-toggle-btn" onClick={toggleChat}>
                {isOpen ? <AiOutlineClose size={20} color="#333" /> : <FaRegUser size={20} color="#333" />}
            </div>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Lycee St. Alexandre Sauli AI</h3>
                        <button onClick={toggleChat} className="close-btn">
                            <AiOutlineClose />
                        </button>
                    </div>

                    {/* Default Message Section */}
                    <div style={{ padding: "20px", flex: 1 }}>
                        <p style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
                            This is Lycee AI! Before we get started, let's get to know each other.

                            
                        </p>
                        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
                            Which of these best describes you?
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {["Future Student", "Current Student", "Parent", "School Counselor", "Alumni", "Faculty/Staff"].map(
                                (option) => (
                                    <button
                                        key={option}
                                        style={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #a52a2a",
                                            color: "#a52a2a",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {option}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className="chat-content">
                        {messages.map((msg, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "flex-start", margin: "10px 0" }}>
                                {msg.sender === "user" && (
                                    <img
                                        src="path_to_user_icon.png" // Replace with your actual user icon image path
                                        alt="user icon"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                        }}
                                    />
                                )}
                                <div
                                    style={{
                                        backgroundColor: msg.sender === "user" ? "#cce5ff" : "#f8f9fa", // Adjust colors for user vs other sender
                                        borderRadius: "15px",
                                        padding: "10px",
                                        maxWidth: "80%",
                                        position: "relative",
                                    }}
                                >
                                    <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>{msg.text}</p>
                                    {msg.sender === "user" && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "-12px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                            }}
                                        >
                                            <img
                                                src="path_to_user_icon.png" // Replace with your actual user icon image path
                                                alt="user icon"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Footer */}
                    <div className="chat-footer">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <button onClick={handleSend} className="send-btn">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
