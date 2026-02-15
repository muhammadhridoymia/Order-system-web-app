import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const url = process.env.REACT_APP_API;

  const socket = io(url);
  const OrderSubmit = () => {
    socket.emit("orderSubmit");
  };

  const [cartItems, setCartItems] = useState([]);
  const [CagegoryImg, setCategoryImg] = useState([]);
  const [Food, setFood] = useState([]);
  const [PopularFood, setPopularFood] = useState([]);
  const [CagegoryFood, setCategoryFood] = useState([]);
  const [DataLiveOrder, setData] = useState({
    items: [],
  });
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const fetchCategoriesFoods = async (id) => {
    try {
      const res = await fetch(`${url}/api/get/categoryfoods/${id}`);

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

  const FetchLiveData = useCallback(async () => {
    const userId = user.id || null;
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const res = await fetch(`${url}/api/get/order/in/mobile/${userId}`);
      const data = await res.json();
      if (data.success) {
        setData(data.order);
        console.log("Order data:", data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const PopularFoodList = useCallback(async () => {
    try {
      const res = await fetch(`${url}/api/get/popular/foods`);
      const data = await res.json();
      if (data.success) {
        setPopularFood(data.popularFoods);
        console.log("Popular DATA:", data.popularFoods);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url]);

  const Category = useCallback(async () => {
    try {
      const res = await fetch(`${url}/api/get/categories`);
      const data = await res.json();
      if (data.success) {
        setCategoryImg(data.categories);
        console.log("Get Category DATA:", data.categories);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url]);

  const FooD = useCallback(async () => {
    try {
      const res = await fetch(`${url}/api/get/foods`);
      const data = await res.json();
      if (data.success) {
        setFood(data.foods);
        console.log("DATA:", data.foods);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url]);
  useEffect(() => {
    PopularFoodList();
    Category();
    FooD();

    if (user?.id) {
      socket.emit("joinRoom", user.id);
    }

    socket.on("orderUpdate", () => FetchLiveData());
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);

      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
    console.log("Cart Items:", cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item._id !== itemId);
      console.log("Updated Cart Items:", updatedCart);
      return updatedCart;
    });
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        OrderSubmit,
        DataLiveOrder,
        FetchLiveData,
        CagegoryFood,
        fetchCategoriesFoods,
        PopularFood,
        CagegoryImg,
        Food,
        cartItems,
        setCartItems,
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
