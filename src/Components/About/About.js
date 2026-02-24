import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      
      <div className="about-content">
        <h1 className="about-title">Welcome to Royal Taste 🍽️</h1>
        
        <p className="about-text">
          At Royal Taste, we believe food is not just about eating — 
          it's about creating memories. Since 2010, we have been serving 
          delicious, fresh, and high-quality meals made with love.
        </p>

        <p className="about-text">
          Our chefs use premium ingredients and modern cooking techniques 
          to deliver unforgettable flavors. Whether you're here for a family 
          dinner or a quick lunch, we promise a warm and delightful experience.
        </p>

        <div className="about-stats">
          <div className="stat-box">
            <h2>15+</h2>
            <p>Years Experience</p>
          </div>

          <div className="stat-box">
            <h2>50K+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat-box">
            <h2>100+</h2>
            <p>Delicious Dishes</p>
          </div>
        </div>

        <button className="about-btn">Explore Our Menu</button>
      </div>

    </div>
  );
}