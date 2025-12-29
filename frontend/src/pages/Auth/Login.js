import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [accountEnabledError, setAccountEnabledError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                navigate("/");
                window.location.reload();
            } else {
                const { message } = await response.json();
                setError(message || "Invalid username or password");

                // Check if error is cuz of account being not enabled
                if (message === "Account is not enabled.") {
                    setAccountEnabledError(true);
                } else {
                    setAccountEnabledError(false);
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again later.");
            setAccountEnabledError(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2>Login</h2>
                    <p className="subtitle">Login to continue shopping</p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Login</button>

                        {error && (
                            <div className="error-box">
                                <p>{error}</p>
                                {accountEnabledError && (
                                    <p className="help-link">
                                        Please{" "}
                                        <Link to="/contact" state={{ username }}>
                                            contact us
                                        </Link>{" "}
                                        for assistance.
                                    </p>
                                )}
                            </div>
                        )}
                    </form>

                    <p className="redirect-link">
                        Don’t have an account?{" "}
                        <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </div>

            <aside>
                <img src="/images/auth/background.jpg" alt="" />
            </aside>
        </div>
    );
};

export default Login;