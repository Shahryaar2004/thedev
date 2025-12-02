import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Pages/CartContext";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import Ship from "./Pages/Ship";
import DeliveryOptions from "./Pages/DeliveryOptions";
import Search from "./Pages/Search";

const App = () => {
  return (
    <CartProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Ship />} />
          <Route path="/delivery" element={<DeliveryOptions />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      
    </CartProvider>
  );
};

export default App;
