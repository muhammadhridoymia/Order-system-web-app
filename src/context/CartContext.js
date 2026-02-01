import React, { createContext, useState, useContext ,useEffect} from 'react';
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [Food,setFood]=useState([])


     const FooD= async()=>{
      try {
        const res = await fetch("http://192.168.0.108:5000/api/get/foods");
        const data = await res.json();
        if (data.success){
          setFood(data.foods)
          console.log("DATA:",data.foods)
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    useEffect(()=>{
      FooD()
    },[])

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newQuantity = (prev[itemId] || 0) - 1;
      if (newQuantity <= 0) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{
      Food,
      cartItems,
      addToCart,
      removeFromCart,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};