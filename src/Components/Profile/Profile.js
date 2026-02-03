import React from "react";
import { useEffect,useState } from "react";
import { foodItems } from "../../utils/constants";
import "../Profile/Profile.css";
import Login from "../AuthComponent/Auth";

function Profile() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const Profile=()=>{

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">JS</div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-bio">Food Lover 🍔</p>
        </div>

        <div className="profile-content">
          <div className="stats-card">
            <h3 className="stats-title">Order Stats</h3>
            <div className="stats-grid">
              <div className="stat-box orange-stat">
                <p className="stat-value">12</p>
                <p className="stat-label">Total Orders</p>
              </div>
              <div className="stat-box blue-stat">
                <p className="stat-value">8</p>
                <p className="stat-label">This Month</p>
              </div>
            </div>
          </div>

          <div className="favorites-card">
            <h3 className="favorites-title">Favorite Items</h3>
            <div className="favorites-list">
              {foodItems.slice(0, 3).map((item) => (
                <div key={item.id} className="favorite-item">
                  <div className="favorite-item-image">{item.image}</div>
                  <div className="favorite-item-details">
                    <p className="favorite-item-name">{item.name}</p>
                    <p className="favorite-item-count">Ordered 5 times</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


 return(
  <>
      {user ? <Profile/> : <Login setUser={setUser} />}
    </>
 )
}

export default Profile;
