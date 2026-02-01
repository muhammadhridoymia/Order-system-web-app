import React from 'react';
import { Star, Plus, Minus } from '../icons/index';
// import './FoodItem.css';

const FoodItem = ({ item, quantity, onAdd, onRemove, onOrderNow }) => {
  return (
    <div className="food-item-card">
      <div className="food-item-image">
        {item.image}
      </div>
      
      <div className="food-item-details">
        <div className="food-item-header">
          <div>
            <h3 className="food-item-name">{item.name}</h3>
            <p className="food-item-description">{item.description}</p>
            <div className="rating-container">
              <Star />
              <span className="rating-value">{item.rating}</span>
            </div>
          </div>
          <span className="food-item-price">${item.price.toFixed(2)}</span>
        </div>
        
        <div className="cart-controls">
          {quantity ? (
            <div className="quantity-controls">
              <button 
                onClick={() => onRemove(item.id)}
                className="quantity-btn"
              >
                <Minus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                onClick={() => onAdd(item.id)}
                className="quantity-btn"
              >
                <Plus />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onAdd(item.id)}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          )}
          
          <button 
            onClick={() => onOrderNow(item.id)}
            className="order-now-btn"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;