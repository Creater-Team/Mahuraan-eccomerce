import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroComponent from "../../components/HeroComponent";
import Loading from "../../components/Loading/Loading";
import { mycart } from "../../store/actions/cart";
import Products from "../Products/Product";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mycart());
  }, []);
  return (
    <div className=" mx-auto" style={{ width: "90%" }}>
      <HeroComponent />
      <Products />
    </div>
  );
};

export default Homepage;
