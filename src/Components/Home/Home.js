import React, { useState } from "react";

import BannerImage from "../../Images/banners.jpg"; // replace with your image
import food1 from "../../Images/img.jpg"; // replace with your food images
import food2 from "../../Images/img.jpg";

const categories = ['All', 'Category', 'Popular', 'Restaurant Post', 'Drinks', 'Desserts'];

const foodItems = [
  { id: 1, name: "Pepperoni Pizza", desc: "Delicious cheese pizza", price: 1200, img: food1 },
  { id: 2, name: "Cheese Burger", desc: "Juicy beef burger", price: 88778, img: food2 },
    { id: 2, name: "Cheese Burger", desc: "Juicy beef burger", price: 8, img: food2 },
  { id: 2, name: "Cheese Burger", desc: "Juicy beef burger", price: 8, img: food2 },
  { id: 2, name: "Cheese Burger", desc: "Juicy beef burger", price: 8, img: food2 },

];

const Home = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [quantities, setQuantities] = useState({});

  const handleQuantity = (id, type) => {
    setQuantities(prev => {
      const value = prev[id] || 1;
      if (type === "inc") return { ...prev, [id]: value + 1 };
      if (type === "dec" && value > 1) return { ...prev, [id]: value - 1 };
      return prev;
    });
  };

  return (
    <div className="app-container">
      
      {/* BANNER */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImage})`, backgroundSize: 'cover' }}>
        <div className="banner-title">Delicious Meals</div>
        <div className="banner-subtitle">Delivered fresh to your door</div>
      </div>

      {/* CATEGORIES */}
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCat === cat ? "active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FOOD LIST */}
      <div className="food-items-grid">
        {foodItems.map(item => (
          <div key={item.id} className="food-item-card">
            {/* LEFT IMAGE */}
            <div className="food-left">
              <img src={item.img} alt={item.name} />
              <div className="food-overlay">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="food-right">
              <div className="food-price">${item.price}</div>

              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => handleQuantity(item.id, "dec")}>-</button>
                <div className="quantity-value">{quantities[item.id] || 1}</div>
                <button className="quantity-btn" onClick={() => handleQuantity(item.id, "inc")}>+</button>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn">Add to Cart</button>
                <button className="order-now-btn">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
