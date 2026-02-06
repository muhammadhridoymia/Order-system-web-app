import React, { useEffect } from "react";
import "../Orders/Order.css";
import { useCart } from "../../context/CartContext";

function LiveOrder() {
  const { DataLiveOrder, FetchLiveData } = useCart();
  useEffect(() => {
    FetchLiveData();
  }, []);

  if (
    !DataLiveOrder ||
    !DataLiveOrder.items ||
    DataLiveOrder.items.length === 0
  ) {
    return (
      <div className="no-order-con">
        <div className="no-order-box">
          <div>No Order</div>
        </div>
      </div>
    );
  }

  const totalPrice = DataLiveOrder.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="order-container">
      {/* Header */}
      <div className="order-header">
        <h2>Live Order</h2>
        <span className={`status`}>{DataLiveOrder.status}</span>
      </div>

      {/* Order Info */}
      <div className="order-info">
        <p>
          <strong>Order ID:</strong> {DataLiveOrder._id}
        </p>
        <p>
          <strong>Ordered At:</strong>{" "}
          {new Date(DataLiveOrder.orderedAt).toLocaleTimeString()}
        </p>

        {DataLiveOrder.message && (
          <p className="message">📝 {DataLiveOrder.message}</p>
        )}
      </div>

      {/* Items (simple style) */}
      <div className="items-simple">
        <h3>Order Items:</h3>

        <ol>
          {DataLiveOrder.items.map((item, index) => (
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
