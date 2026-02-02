import { useState } from "react";
import React from "react";
import { useCart } from "../../context/CartContext";
import OrderSubmit from "../Popup/OrderSubmit";

function Popular() {
    const { addToCart, PopularFood } = useCart();
    const [quantities, setQuantities] = useState({});
    const [popup ,setpopup]=useState(false)
    
  


    const handleQuantity = (id, type) => {
    setQuantities(prev => {
      const value = prev[id] || 1;
      if (type === "inc") return { ...prev, [id]: value + 1 };
      if (type === "dec" && value > 1) return { ...prev, [id]: value - 1 };
      return prev;
    });
  };

  return (
    <div>

      <OrderSubmit isOpen={popup} onClose={() => setpopup(false)} />

      <div className="food-items-grid">
        {PopularFood.map((item) => (
          <div key={item._id} className="food-item-card">
            {/* LEFT IMAGE */}
            <div className="food-left">
              <img src={item.img} alt={item.name} />
              <div className="food-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="food-right">
              <div className="food-price">${item.price}</div>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantity(item._id, "dec")}
                >
                  -
                </button>
                <div className="quantity-value">{quantities[item.id] || 1}</div>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantity(item._id, "inc")}
                >
                  +
                </button>
              </div>

              <div className="action-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
                <button className="order-now-btn" onClick={()=>setpopup(true)}>Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
