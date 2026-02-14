import { useState } from "react";
import React from "react";
import OrderSubmit from "../Popup/OrderSubmitPopup/OrderSubmit";
import { useCart } from "../../context/CartContext";

function AllFood() {
  const { addToCart, Food ,cartItems} = useCart();
  const [popup, setpopup] = useState(false);
  const [id,setid]=useState("")

  const [quantities, setQuantities] = useState({});

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <div>
      <OrderSubmit isOpen={popup} onClose={() => setpopup(false)} foodId={id}quantities={quantities[id]||1} />

      <div className="food-items-grid">
        {Food.map((item) => (
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
                <button className="quantity-btn" onClick={() => decreaseQty(item._id)}>
                  -
                </button>
                <div className="quantity-value">{quantities[item._id]||1}</div>
                <button className="quantity-btn" onClick={() => increaseQty(item._id)}>
                  +
                </button>
              </div>

              <div className="action-buttons">
                <button
                  className={cartItems.some((i) => i._id === item._id) ? "added-btn" : "add-to-cart-btn"}
                  onClick={() => addToCart(item)}
                >
                  {cartItems.some((i) => i._id === item._id) ? "Added" : "Add to Cart"}
                </button>
                <button
                  className="order-now-btn"
                  onClick={() => {setpopup(true);setid(item._id)}}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllFood;
