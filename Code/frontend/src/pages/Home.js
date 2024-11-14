import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UncontrolledCarousel from "../components/UncontrolledCarousel";
import ProductSection from "../components/ProductSection";

function scrollRight() {
  document.getElementById("home-category-nav").scrollLeft += 50;
}

function scrollLeft() {
  document.getElementById("home-category-nav").scrollLeft -= 50;
}

const Home = () => {
  return (
    <div className="home-body">
      <div
        id="home-category-container"
        className="d-flex flex-row align-items-center"
      >
        <button className="scroll-btn" id="prev" onClick={scrollLeft}>
          <img
            src={window.location.origin + "/icons/chevron-prev.png"}
            alt="previous"
            height={15}
          ></img>
        </button>
        <ul
          id="home-category-nav"
          className="d-flex flex-row justify-content-between align-items-center"
        >
          <li>
            <Link to="/search?category=Tech">Tech</Link>
          </li>
          <li>
            <Link to="/search?category=Outdoor%20Gear">Outdoor Gear</Link>
          </li>
          <li>
            <Link to="/search?category=Home%20Appliances">Home Appliances</Link>
          </li>
          <li>
            <Link to="/search?category=Women%27s">Women's</Link>
          </li>
          <li>
            <Link to="/search?category=Men%27s">Men's</Link>
          </li>
          <li>
            <Link to="/search?category=Kids%27">Kids'</Link>
          </li>
          <li>
            <Link to="/search?category=Accessories">Accessories</Link>
          </li>
          <li>
            <Link to="/search?category=Shoes">Shoes</Link>
          </li>
          <li>
            <Link to="/search?category=Other">Other</Link>
          </li>
        </ul>
        <button className="scroll-btn" id="next" onClick={scrollRight}>
          <img
            src={window.location.origin + "/icons/chevron-next.png"}
            alt="next"
            height={15}
          ></img>
        </button>
      </div>

      <UncontrolledCarousel />
      <ProductSection name="Deals" />
      <ProductSection name="Tech" />
      <ProductSection name="Outdoor Gear" />
      <ProductSection name="Shoes" />
      <ProductSection name="Recommended" />

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Home;