import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 class="league-spartan-bold">OnlineShop</h1>
      </Link>
      <form method="POST" action="#" id="search-form">
        <div>
          <img src={window.location.origin + '/icons/search.png'} alt="search" height={20} />
          <input type="text" placeholder="Search" />
        </div>
        <Button variant="dark" id="search-btn" type="submit">Go</Button>
      </form>
      <div id="getin-btns">
        <Link to="/login">
          <Button variant="dark">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="outline-dark" id="signup-btn">Signup</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
