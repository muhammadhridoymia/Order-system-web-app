import React, { useState } from 'react';
import { ShoppingCart, User, Package,ListOrdered} from 'lucide-react';
import '../Style/Home.css';

//pages
import Profile from '../Components/Profile/Profile';
import Home from '../Components/Home/Home';
import CartItem from '../Components/CartItem/CartItem';
import Order from '../Components/Orders/Order';


const FoodOrderApp = () => {
  const [activeTab, setActiveTab] = useState('home');
 
 
  return (
    <div className="app-container">

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'home' && <Home/>}
        {activeTab === 'cart' && <CartItem/>}
        {activeTab === 'profile' && <Profile/>}
        {activeTab==='orders' && <Order/>}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <div className="nav-buttons">
          <button 
            onClick={() => setActiveTab('home')}
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Package className="nav-icon" />
            <span className="nav-label">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('cart')}
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
          >
            <div className="nav-cart-wrapper">
              <ShoppingCart className="nav-icon" />
            </div>
            <span className="nav-label">Cart</span>
          </button>

          <button 
          onClick={()=>setActiveTab("orders")}
          className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          <ListOrdered className="nav-icon" />
          <span className="nav-label">Orders</span>
        </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User className="nav-icon" />
            <span className="nav-label">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderApp;