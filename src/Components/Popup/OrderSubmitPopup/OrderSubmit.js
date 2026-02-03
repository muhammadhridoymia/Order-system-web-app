import React from 'react'
import '../OrderSubmitPopup/OrderSubmit.css';

function OrderSubmit({ isOpen, onClose ,foodId,quantities}) {
  console.log("foodid",foodId,"Quantities",quantities)
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">Order Details</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        
        <div className="popup-content">
          <form className="popup-form">
            <input 
              type='text' 
              placeholder='Table Number or Address'
              className="popup-input"
            />
            <p className="quantity-display">
              Quantity: <span>4</span>
            </p>
            <div className="popup-buttons">
              <button 
                type="button" 
                className="popup-button popup-button-primary"
              >
                Place Order
              </button>
              <button 
                type="button" 
                className="popup-button popup-button-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OrderSubmit