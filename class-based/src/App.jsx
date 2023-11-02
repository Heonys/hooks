import React from "react";
import { Layout } from "./lib/MyLayout";
import { Route, Router, Routes } from "./lib/MyRouter";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";

const App = (props) => (
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
export default App;
