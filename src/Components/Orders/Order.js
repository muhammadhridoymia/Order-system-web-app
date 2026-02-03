import React from "react";
import "../Orders/Order.css";

const demoOrder = {
  _id: "ORD-10234",
  status: "Preparing",
  orderedAt: "2026-02-03T09:30:00Z",
  message: "Please make it less spicy",
  items: [
    {
      name: "Chicken Burger",
      price: 250,
      quantity: 2,
      received: false,
    },
    {
      name: "French Fries",
      price: 120,
      quantity: 1,
      received: true,
    },
  ],
};

function LiveOrder() {
  // calculate total
  const totalPrice = demoOrder.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container">
      {/* Header */}
      <div className="order-header">
        <h2>Live Order</h2>
        <span className={`status ${demoOrder.status.toLowerCase()}`}>
          {demoOrder.status}
        </span>
      </div>

      {/* Order Info */}
      <div className="order-info">
        <p><strong>Order ID:</strong> {demoOrder._id}</p>
        <p>
          <strong>Ordered At:</strong>{" "}
          {new Date(demoOrder.orderedAt).toLocaleTimeString()}
        </p>

        {demoOrder.message && (
          <p className="message">📝 {demoOrder.message}</p>
        )}
      </div>

      {/* Items (simple style) */}
      <div className="items-simple">
        <h3>Order Items:</h3>

        <ol>
          {demoOrder.items.map((item, index) => (
            <li key={index}>
              {item.name} x{item.quantity}
            </li>
          ))}
        </ol>

        <div className="total">
          <strong>Total:</strong> ৳{totalPrice}
        </div>
      </div>
    </div>
  );
}

export default LiveOrder;
