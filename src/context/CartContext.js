import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [CagegoryImg, setCategoryImg] = useState([]);

  const [Food, setFood] = useState([]);
  const [PopularFood, setPopularFood] = useState([]);
  const [CagegoryFood, setCategoryFood] = useState([]);
  const url=process.env.API

  const fetchCategoriesFoods = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/get/categoryfoods/${id}`,
      );

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      if (data.success) {
        setCategoryFood(data.foods);
        console.log("Fetched categories foods:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const PopularFoodList = async () => {
    try {
      const res = await fetch(
        "http://172.172.10.240:5000/api/get/popular/foods",
      );
      const data = await res.json();
      if (data.success) {
        setPopularFood(data.popularFoods);
        console.log("Popular DATA:", data.popularFoods);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const Category = async () => {
    try {
      const res = await fetch("http://172.172.10.240:5000/api/get/categories");
      const data = await res.json();
      if (data.success) {
        setCategoryImg(data.categories);
        console.log("Get Category DATA:", data.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const FooD = async () => {
    try {
      const res = await fetch(`${url}/api/get/foods`);
      const data = await res.json();
      if (data.success) {
        setFood(data.foods);
        console.log("DATA:", data.foods);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };
  useEffect(() => {
    PopularFoodList();
    Category();
    FooD();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
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
    <CartContext.Provider
      value={{
        CagegoryFood,
        fetchCategoriesFoods,
        PopularFood,
        CagegoryImg,
        Food,
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
