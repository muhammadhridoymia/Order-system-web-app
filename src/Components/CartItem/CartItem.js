import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "../CartItem/CartItem.css";

function CartItem() {
  const { cartItems, removeFromCart,setCartItems } = useCart();

  const TotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrderNow = () => {
    alert(`Order placed! Total:${TotalPrice}$`);

    const orderData = cartItems.map((item) => ({foodId: item._id,quantity: item.quantity, }));

    console.log(orderData);
  };


  const increaseQuantity = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};


  return (
    <div>
      <div className="cart-container">
        <h2 className="cart-title">My Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart className="empty-cart-icon" />
            <p className="empty-cart-text">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* show cart food here*/}
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                    <div className="cart-quantity-controls">
                      <button className="quantity-btn" onClick={() => decreaseQuantity(item._id)}>-</button>
                      <div className="quantity-value">{item.quantity}</div>
                      <button className="quantity-btn" onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${TotalPrice}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Delivery</span>
                <span className="summary-value">$2.99</span>
              </div>
              <div className="summary-row total">
                <span className="summary-label">Total</span>
                <span className="summary-value">${TotalPrice + 2.99}</span>
              </div>
              <button onClick={handleOrderNow} className="place-order-btn">
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
