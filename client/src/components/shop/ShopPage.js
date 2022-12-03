import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mycart } from "../../store/actions/cart";
import { getAllProducts } from "../../store/actions/productActions";
import Loading from "../Loading/Loading";
import ShopItem from "./ShopItem";

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mycart());
  }, []);
  const { products, loading, error } = useSelector(
    (state) => state.allProducts
  );
  const allProducts =
    products && products.filter((product) => product.inStock > 0);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* <h1 className="text-xl font-bold mb-4">SHOPPING</h1> */}
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-sm text-gray-500 font-light flex items-center justify-center space-x-3">
          <span>0 items found</span>
        </p>
      ) : (
        allProducts?.length && (
          <div className="bg-gray-50 p-6 ">
            {allProducts.map((product) => (
              <ShopItem product={product} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ShopPage;
