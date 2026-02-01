import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Banner from '../Components/Banner/Banner';
import CategoryNav from '../Components/BottomNav/BottomNav';
import FoodItem from '../Components/FoodItem/FoodItem';
import BottomNav from '../Components/BottomNav/BottomNav';
import CartPage from '../Components/CartItem/CartItem';
import ProfilePage from '../Components/ProfilePage/ProfilePage';
import { categories, foodItems } from '../utils/constants';
import '../Style/Home.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredItems = activeCategory === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  const handleOrderNow = (itemId) => {
    alert('Order placed!');
    if (!cartItems[itemId]) addToCart(itemId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'cart':
        return <CartPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <>
            <Banner />
            <CategoryNav 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="food-list-container">
              <h2 className="section-title">
                {activeCategory === 'All' ? 'All Items' : activeCategory}
              </h2>
              
              <div className="food-items-grid">
                {filteredItems.map((item) => (
                  <FoodItem
                    key={item.id}
                    item={item}
                    quantity={cartItems[item.id]}
                    onAdd={addToCart}
                    onRemove={removeFromCart}
                    onOrderNow={handleOrderNow}
                  />
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-logo">FoodExpress</h1>
        {/* Cart icon with badge */}
      </div>

      <div className="main-content">
        {renderContent()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Home;