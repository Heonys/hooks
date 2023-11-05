import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import { Router, Routes, Route } from "./lib/MyRouter";
import { Layout } from "./lib/MyLayout";

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

// export default App;

import React, { useState } from "react";
import { produce } from "immer";

const Counter = () => {
  const [values, setValues] = useState({ id: "", password: "" });

  const handleChange = (e) => {
    const nextValue = produce(values, (draft) => {
      draft[e.target.name] = e.target.value;
    });
    setValues(nextValue);
  };

  const handleChange2 = (e) => {
    setValues(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  return (
    <>
      <input type="text" name="id" value={values.id} onChange={handleChange2} />
      <input type="text" name="password" value={values.password} onChange={handleChange2} />
      <button>클릭</button>
    </>
  );
};

export default Counter;
