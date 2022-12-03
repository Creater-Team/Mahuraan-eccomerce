import React from "react";
import { Link } from "react-router-dom";

const ShopItem = ({ product }) => {
  return (
    <div className="bg-white p-6 my-3 w-full">
      <Link to={`/products/${product.productId}`}>
        <div className="flex items-start space-x-4">
          <div
            className="img"
            style={{
              width: "130px",
              height: "130px",
            }}
          >
            <img
              className="rounded border-2 border-pink-600"
              style={{
                width: "100%",
                height: "100px",
                objectFit: "cover",
              }}
              src={product.image}
              alt=""
            />
          </div>
          <div className="title">
            <p>{product.title}</p>
            <p className="text-pink-600 font-bold"> ${product.price}</p>
            <p className="mt-3 text-green-500">In stock</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopItem;
