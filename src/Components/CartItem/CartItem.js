import React from "react";
import { ShoppingCart, Plus, Minus, } from 'lucide-react';
import { foodItems } from "../../utils/constants";

import { useCart } from "../../context/CartContext";



function CartItem() {
  const {cartItems,removeFromCart,addToCart}=useCart()

    const getCartTotal = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = foodItems.find(f => f.id === parseInt(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };


    const handleOrderNow = () => {
    alert(`Order placed! Total: $${getCartTotal().toFixed(2)}`);
  };


  return (
    <div>
      <div className="cart-container">
        <h2 className="cart-title">My Cart</h2>

        {Object.keys(cartItems).length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart className="empty-cart-icon" />
            <p className="empty-cart-text">Your cart is empty</p>
          </div>
        ) : (
          <>
          {/* show cart food here*/}
          <div className="cart-items-list">
            {Object.entries(cartItems).map(([itemId, quantity]) => {
              const item = foodItems.find(f => f.id === parseInt(itemId));
              return item ? (
                <div key={itemId} className="cart-item-card">
                  <div className="cart-item-content">
                    <div className="cart-item-image">
                      {item.image}
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                      
                      <div className="cart-item-controls">
                        <div className="cart-quantity-controls">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="cart-quantity-btn"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="cart-quantity-value">{quantity}</span>
                          <button 
                            onClick={()=> addToCart(item.id)}
                            className="cart-quantity-btn"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <span className="cart-item-total">
                          ${(item.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
          
          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Delivery</span>
              <span className="summary-value">$2.99</span>
            </div>
            <div className="summary-row total">
              <span className="summary-label">Total</span>
              <span className="summary-value">${(getCartTotal() + 2.99).toFixed(2)}</span>
            </div>
            <button 
              onClick={handleOrderNow}
              className="place-order-btn"
            >
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
