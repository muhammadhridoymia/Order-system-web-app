import React, { useState } from "react";
import BannerImage from "../../Images/banners.jpg";
import { categories } from "../../utils/constants";
import { useCart } from "../../context/CartContext";

import AllFood from "../FoodItems/AllFood";
import Popular from "../FoodItems/Popular";
import CategoryFoodImg from "../Category/CategoryFoodImg";
import PostComponent from "../Post/Post";
import About from "../About/About";


const Home = () => {
  const { banners } = useCart();
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="app-container">
      
      {/* BANNER */}
      <div className="banner" style={{ backgroundImage: `url(${banners[1]?.img || BannerImage})`, backgroundSize: 'cover' }}>
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
      {activeCat==="All"&& <AllFood/>}
      {activeCat==="Popular"&& <Popular/>}
      {activeCat==="Category"&& <CategoryFoodImg/>}
      {activeCat==="Restaurant Post"&& <PostComponent/>}
      {activeCat==="About Us"&& <About/>}
    </div>
  );
};

export default Home;
