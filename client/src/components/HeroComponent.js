import React from "react";
import heroImg from "../assets/images/heroimg.png";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <div
      className="flex items-center justify-between mx-auto"
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <div className="info sm:basis-full md:basis-2/5">
        <h1 className="text-4xl ">
          We are<span className="text-pink-600 font-bold"> delivering</span> to
          your place with <span className="text-pink-600 font-bold">quick</span>
        </h1>
        <p className="py-3 text-gray-400">
          Communication is at the heart of ecommerce and community
        </p>
        <div className="flex justify-start">
          <Link to="/shop">
            <button className="bg-pink-600 transition-all font-bold my-3 hover:bg-pink-700 px-6 py-3 text-white rounded shadow-md">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
      <div
        className="img hidden md:block"
        style={{
          flexBasis: "60%",
        }}
      >
        <img
          src={heroImg}
          style={{
            width: "100%",
            height: "100%",
          }}
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroComponent;
