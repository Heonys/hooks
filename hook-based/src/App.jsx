import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import { Router, Routes, Route } from "./lib/MyRouter";
import { Layout } from "./lib/MyLayout";
import { useEffect, useState } from "react";
import MyReact from "./lib/MyReact";

const App = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route to="/" element={<ProductPage />} />
          <Route to="/order" element={<OrderPage />} />
          <Route to="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
