import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null); // State variable to store response status
  const [passwordMismatch, setPasswordMismatch] = useState(false); // State variable to track password mismatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset password mismatch state when typing in the password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setResponseMessage("Passwords do not match");
      setPasswordMismatch(true);
      setResponseStatus(400);
      return;
    }
    // Send data to the API endpoint // http://localhost:3030/api/users // https://group-13-jtix.vercel.app/api/users
    fetch("http://localhost:3030/api/users", {
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
    <Container style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px' }}>
        <h2 style={{ marginTop: '10px', marginRight: '45px', marginBottom: '25px', marginLeft: '10px' }}>Create your account</h2>
        <Form onSubmit={handleSubmit} style={{ width: '90%' }}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Account Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ marginTop: '1px' }}></Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ marginTop: '35px' }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ borderColor: passwordMismatch ? 'red' : '' }} // Apply red border color if password mismatch
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label style={{ marginTop: '10px' }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ borderColor: passwordMismatch ? 'red' : '' }} // Apply red border color if password mismatch
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ paddingTop: '3%', paddingBottom: '3%',width: '40%',marginTop: '10%', marginLeft: '30%'  }}>
            Register
          </Button>
        </Form>
        {responseMessage && (
          <Alert variant={responseStatus === 400 ? "danger" : "success"} style={{ marginTop: '20px', maxWidth: '90%' }}>
            {responseMessage}
          </Alert>
        )}
      </div>
    </Container>
  );
}

export default RegisterForm;