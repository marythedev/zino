import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset password mismatch state when typing in the password fields
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordMismatch(false);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setResponseMessage("Passwords do not match");
            setPasswordMismatch(true);
            setResponseStatus(400);
            return;
        }
        // Send data to the API endpoint /api/users
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                setResponseStatus(response.status);
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    setResponseMessage(data.message);
                    if (responseStatus !== 400) {
                        alert("Account has been created.");
                        navigate("/login");
                        window.location.reload();
                    }
                } else {
                    setResponseMessage("An error occurred. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setResponseMessage("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="auth-page-wrapper">
            <aside>
                <img src="/images/auth/background.jpg" alt="" />
            </aside>

            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2>Signup</h2>
                    <p className="auth-subtitle">Create your account</p>

                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ borderColor: passwordMismatch ? 'red' : '' }}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ borderColor: passwordMismatch ? 'red' : '' }}
                            required
                        />

                        <button type="submit">Signup</button>

                        {responseMessage && responseStatus === 400 && (
                            <div className="error-box">
                                <p>{responseMessage}</p>
                            </div>
                        )}
                    </form>

                    <p className="redirect-link">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;