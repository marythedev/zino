import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ContactForm = () => {
  const location = useLocation();
  const [name, setName] = useState(location.state?.username || "");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://group-13-jtix.vercel.app/api/contact", {
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
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Your Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            readOnly={isSubmitted}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Your Email for this account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={isSubmitted}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
            readOnly={isSubmitted}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
          Submit
        </button>
      </form>
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ContactForm;
