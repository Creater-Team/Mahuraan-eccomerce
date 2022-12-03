import React from "react";
import { Link } from "react-router-dom";
import keepshopping from "../../assets/images/keepshoppin.png";

const KeepShopping = () => {
  return (
    <div
      className="container mx-auto "
      style={{
        width: "100%",
      }}
    >
      <div
        className="img mx-auto w-full"
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        <img
          onClick={(e) => e.preventDefault()}
          src={keepshopping}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <p className="text-center py-3">
        Your cart has no items yet, Please add items to show.
      </p>
      <Link to={"/"}>
        {" "}
        <div className="flex justify-center">
          <button className="bg-pink-600 transition-all hover:bg-pink-700 px-6 py-3 text-white rounded shadow-md">
            Keep shopping
          </button>
        </div>
      </Link>
    </div>
  );
};

export default KeepShopping;
