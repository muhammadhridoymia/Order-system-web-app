import React, { useEffect } from "react";
import { useState } from "react";
import "../FoodListPopup/FoodList.css";
import { useCart } from "../../../context/CartContext";
import OrderSubmit from "../OrderSubmit";

function FoodList({ isOpen, onClose ,id}) {
  const { addToCart, CagegoryFood,fetchCategoriesFoods } = useCart();
  const [quantities, setQuantities] = useState({});
  const [popup, setpopup] = useState(false);

  const handleQuantity = (id, type) => {
    setQuantities((prev) => {
      const value = prev[id] || 1;
      if (type === "inc") return { ...prev, [id]: value + 1 };
      if (type === "dec" && value > 1) return { ...prev, [id]: value - 1 };
      return prev;
    });
  };

  useEffect(()=>{
    fetchCategoriesFoods(id)
  },[id])

  if (!isOpen) return null;

  return (
    <div className="category-popup-overlay" onClick={onClose}>
      <div className="category-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="category-popup-header">
          <h2 className="category-popup-title">Food List</h2>
          <button className="category-popup-close" onClick={onClose}>
            Back
          </button>
        </div>

        <div className="category-popup-content">
          <div>
            <OrderSubmit isOpen={popup} onClose={() => setpopup(false)} />

            <div className="category-food-items-grid">
              {CagegoryFood.map((item) => (
                <div key={item._id} className="category-food-item-card">
                  {/* LEFT IMAGE */}
                  <div className="category-food-left">
                    <img src={item.img} alt={item.name} />
                    <div className="category-food-overlay">
                      <h3>{item.name}</h3>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="category-food-right">
                    <div className="category-food-price">${item.price}</div>

                    <div className="category-quantity-controls">
                      <button
                        className="category-quantity-btn"
                        onClick={() => handleQuantity(item._id, "dec")}
                      >
                        -
                      </button>
                      <div className="category-quantity-value">
                        {quantities[item.id] || 1}
                      </div>
                      <button
                        className="category-quantity-btn"
                        onClick={() => handleQuantity(item._id, "inc")}
                      >
                        +
                      </button>
                    </div>

                    <div className="category-action-buttons">
                      <button
                        className="category-add-to-cart-btn"
                        onClick={() => addToCart(item.id)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="category-order-now-btn"
                        onClick={() => setpopup(true)}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
