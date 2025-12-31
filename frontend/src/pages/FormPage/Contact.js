import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Contact = () => {
    const location = useLocation();
    const [name, setName] = useState(location.state?.username || "");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setSuccess("Your message has been sent successfully!");
                setIsSubmitted(true);
            } else {
                const { message } = await response.json();
                setError(message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2>Contact Us</h2>
                    <p className="auth-subtitle">We will get back to you shortly</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            readOnly={isSubmitted}
                        />

                        <input
                            type="email"
                            placeholder="Email for your account"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            readOnly={isSubmitted}
                        />

                        <textarea
                            type="text"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            required
                            readOnly={isSubmitted}
                        />

                        <button type="submit" disabled={isSubmitted}>Submit</button>

                        {success && (
                            <div className="success-box">
                                <p>{success}</p>
                            </div>
                        )}
                        {error && (
                            <div className="error-box">
                                <p>{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;