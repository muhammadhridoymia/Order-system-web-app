import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../Category/Category.css";
import FoodList from "../Popup/FoodListPopup/FoodList";

function CategoryFoodImg() {
  const { CagegoryImg } = useCart();
  const [popup, setpopup] = useState(false);
  const [id,setid]=useState("")

  return (
    <div>
      {<FoodList isOpen={popup} onClose={() => setpopup(false)} id={id} />}
      <div className="category-items-grid">
        {CagegoryImg.map((item) => (
          <div
            key={item._id}
            className="category-item-card"
            onClick={() => {
              setpopup(true);
              setid(item._id)
            }}
          >
            <div className="category-img">
              <img src={item.img} alt={item.name} />
              <div className="category-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFoodImg;
