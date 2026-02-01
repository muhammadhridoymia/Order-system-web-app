import React from 'react';
import { CartProvider } from './context/CartContext';
import Home from './Pages/Home';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;