import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Announcement from "./components/Anouncements.js/Announcement";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound";
import CartPage from "./pages/cartPage";
import Checkout from "./pages/Checkout/Checkout";
import Content from "./pages/Dashboard/Content";
import Sidebar from "./pages/Dashboard/Sidebar";
import Admin from "./pages/Dashboard/Sidebar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Order from "./pages/ordersPage/order";
import ProductView from "./pages/Products/ProductView";
import { motion } from "framer-motion";
import HeroComponent from "./components/HeroComponent";
import ShopPage from "./components/shop/ShopPage";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const { admin } = useSelector((state) => state.adminView);
  const { isOpen } = useSelector((state) => state.toggle);
  return (
    <>
      {!admin ? (
        <>
          {" "}
          {showHeader && <Announcement />}
          {showHeader && <Header />}
          <div className="m-auto" style={{ width: "90%" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/place-order" element={<Checkout />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/products/:id" element={<ProductView />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="overflow-hidden">
          <div className="flex w-full">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, type: "tween" }}
                style={{
                  height: "auto",
                }}
              >
                <Sidebar />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, type: "tween" }}
              style={{
                flexBasis: !isOpen ? "100%" : "100%",
              }}
            >
              <Content />
            </motion.div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
