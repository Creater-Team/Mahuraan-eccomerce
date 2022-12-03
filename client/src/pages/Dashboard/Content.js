import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import CartPage from "../cartPage";
import { HomePage } from "./Pages/HomePage";
import ProductPage from "./Pages/Products/ProductPage";
import NewProduct from "./Pages/Products/NewProduct";
import styles from "./style.module.css";
import NotFound from "../../components/NotFound";
import Orders from "./Pages/Orders";
import DeliveredOrders from "./Pages/Orders/DeliveredOrders";
import UnDeliveredOrders from "./Pages/Orders/UnDelivered";
import Categories from "./Pages/Categories.js/Categories";
import NewCategory from "./Pages/Categories.js/NewCategory";
import Sales from "./Pages/Sales/Sales";
import UsersList from "./Pages/users/usersList";

const Content = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.toggle);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleToggle = () => {
    if (isOpen) {
      dispatch({
        type: "CLOSE",
      });
    } else {
      dispatch({
        type: "OPEN",
      });
    }
  };

  useEffect(() => {
    if (userInfo && !userInfo.admin) {
      navigate("*");
    }
  }, [userInfo]);

  return (
    <div className={styles.contentWrapper}>
      <div className="bg-white shadow-md  p-4 flex items-center justify-between">
        <div>
          <svg
            onClick={handleToggle}
            xmlns="http://www.w3.org/2000/svg"
            className=" text-black cursor-pointer h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-3">
          {" "}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              className="rounded-full"
              src={userInfo.photo}
              alt=""
            />
          </div>
          <div></div>
        </div>
      </div>
      <Routes>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/admin/product" element={<ProductPage />} />
        <Route path="/admin/product/new" element={<NewProduct />} />
        <Route path="/admin/cats" element={<Categories />} />
        <Route path="/admin/cats/new" element={<NewCategory />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/orders/delivered" element={<DeliveredOrders />} />
        <Route
          path="/admin/orders/not-delivered"
          element={<UnDeliveredOrders />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Content;
