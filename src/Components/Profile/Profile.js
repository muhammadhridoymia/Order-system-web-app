import React from "react";
import { useEffect,useState } from "react";
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

  const Delete=()=>{
    localStorage.removeItem("user");

  }


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
            <h3 className="favorites-title">Sittings</h3>
            <button onClick={()=>Delete()}>Log Out </button>
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
