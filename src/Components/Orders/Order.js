import React, { useEffect, useState } from "react";
import "../Orders/Order.css";



function LiveOrder() {
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState({
  items: [],
});

  // calculate total
  const totalPrice = Data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const Userid = localStorage.getItem("user");

  const handleSubmit = async () => {
    const user = JSON.parse(Userid);
    const userId = user.id;
    console.log(`userid is : ${userId}`);

    try {
      setLoading(true);
      const res = await fetch(
        `http://172.172.10.240:5000/api/get/order/in/mobile/${userId}`,
      );
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        setData(data.order)
        console.log("Order data:", data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="order-container">
      {/* Header */}
      <div className="order-header">
        <h2>Live Order</h2>
        <span className={`status`}>
          {Data.status}
        </span>
      </div>

      {/* Order Info */}
      <div className="order-info">
        <p>
          <strong>Order ID:</strong> {Data._id}
        </p>
        <p>
          <strong>Ordered At:</strong>{" "}
          {new Date(Data.orderedAt).toLocaleTimeString()}
        </p>

        {Data.message && <p className="message">📝 {Data.message}</p>}
      </div>

      {/* Items (simple style) */}
      <div className="items-simple">
        <h3>Order Items:</h3>

        <ol>
          {Data.items.map((item, index) => (
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
