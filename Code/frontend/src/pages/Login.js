/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accountEnabledError, setAccountEnabledError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://group-13-jtix.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        alert("Login successful!");
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
    <section className="position-relative overflow-hidden vh-100">
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="py-4 text-center">
              <a className="d-inline-block mb-4" href="#">
                <img
                  className="img-fluid"
                  src="yofte-assets/logos/yofte-logo.svg"
                  alt=""
                />
              </a>
              <h2 className="mb-3">Login</h2>
              <p className="mb-4">Please, login to shop</p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-check-label small"
                    htmlFor="agreeCheckbox"
                  >
                    <a href="/register">I don't have an account</a>
                  </label>
                </div>
                <button className="btn btn-dark btn-lg btn-block mb-2 w-100">
                  LOGIN
                </button>
                {error && (
                  <div>
                    <p>{error}</p>
                    {accountEnabledError && (
                      <p>
                        Please <Link to="/contact" state={{ username }}>contact us</Link> for assistance.
                      </p>
                    )}
                  </div>
                )}
              </form>
            </div>
            <img
              className="d-lg-none w-100"
              style={{ height: "384px" }}
              src="yofte-assets/images/placeholder-sign.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        className="d-none d-lg-block position-absolute top-0 bottom-0 end-0 col-lg-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </section>
  );
};

export default Login;
