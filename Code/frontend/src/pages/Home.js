import React from 'react';
import './Home.css';

const fetchGet = () => {
  console.log("Fetching Get from backend...");
  fetch("https://group-13-jtix.vercel.app/api", {
    method: "GET"
  })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

const fetchPost = () => {
  console.log("Fetching Post from backend");
  fetch("https://group-13-jtix.vercel.app/api", {
    method: "POST"
  })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

const Home = () => {
  return (
    <div className="home-body">
      <h1>Welcome to our online shop :)</h1>
      <div className="home-button-row"> {/* Use home-button-row class */}
        <button className="home-button" onClick={fetchGet}>Backend Test: GET</button>
        <button className="home-button" onClick={fetchPost}>Backend Test: POST</button>
      </div>
    </div>
  );
}

export default Home;
