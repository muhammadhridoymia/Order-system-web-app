import React, { useState } from "react";
import "../OrderSubmitPopup/OrderSubmit.css";
import Login from "../../AuthComponent/Auth";

function OrderSubmit({ isOpen, onClose, foodId, quantities }) {

  const Userid = localStorage.getItem("user");


  const [ShowSuccess,setSuccess]=useState(false)
  const [name,setname]=useState("")
  const [message,setMessage]=useState("")
  const [loading,setLoading]=useState(false)
  const url = process.env.REACT_APP_API;




  if(ShowSuccess){
    return(
      <ShowSuccessUI onClose={()=>{setSuccess(false);onClose()}} message={message}/>
    )
  }
    if (!isOpen) {
      return null
    }
    if(!Userid){
      return(
        <ShowLogin onClose={onClose}/>
      )
    }

  const handleSubmit = async () => {
    const user = JSON.parse(Userid);
    const userId=user.id
    const quantity = quantities;
    const items=[{foodId,quantity}]

    if (items && userId && name) {
      setLoading(true)
      try {
        const res = await fetch(`${url}/api/order/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId,items,name}),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true)
          setMessage(data.message)
          setLoading(false)
        }
        setSuccess(true)
        setMessage(data.message)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    } else {
      setLoading(false)
      alert("Enter Table Number or Address");
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">Order Details</h2>
          <button className="popup-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="popup-content">
          <form className="popup-form">
            <input
              type="text"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              placeholder="Table Number or Address"
              className="popup-input"
            />
            <p className="quantity-display">
              Quantity: <span>{quantities}</span>
            </p>
            <div className="popup-buttons">
              <button
                type="button"
                className="popup-button popup-button-primary"
                onClick={handleSubmit}
              >
                {loading?"Wait..":"Place Order"}
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
  );
}

const ShowLogin = ({ onClose }) => {
  const [show,setShow]=useState(false)
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">Log In First</h2>
          <button className="popup-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="login-btn"><button onClick={()=>setShow(true)}>Login</button></div>
        {show?<Login/>:""}
        <div className="popup-content"></div>
      </div>
    </div>
  );
};

const ShowSuccessUI = ({ onClose ,message}) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">Log In First</h2>
          <button className="popup-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="login-btn"><p>{message}</p></div>
        <div className="popup-content"></div>
      </div>
    </div>
  );
};

export default OrderSubmit;
