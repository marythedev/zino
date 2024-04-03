import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">
              <img src="logo192.png" alt="Logo" className='logo'/>
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/exampleLandingPage">Bootstrap Store Page Example</Link>
          </li>
          <li className="register-link">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
