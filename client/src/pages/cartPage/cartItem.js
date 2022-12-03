import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { products } from "../../data";
import {
  addToCart,
  addToCartWithUser,
  decrementCart,
  mycart,
  removeItem,
  removeItemFromCart,
  updateCartItem,
} from "../../store/actions/cart";
import { toast, Bounce, Zoom } from "react-toastify";
import { css } from "glamor";

const CartItem = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.allProducts);
  const [qty, setQty] = useState(product.qty);

  const dispatch = useDispatch();
  const decrementHandler = () => {
    // dispatch(decrementCart(product.productId));
    dispatch(updateCartItem(product.id));
  };
  const incrementHandler = () => {
    dispatch(addToCartWithUser(product.products.productId));

    if (product.qty < product.products.inStock) {
      product.qty++;
    } else {
      toast(
        ` ⛔ Only ${product.qty} items of ${product.products.title}  are in stock `,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        }
      );
    }

    // const item = products.find((x) => x.productId === product.productId);
    // const cart = cartItems.find((x) => x.productId === product.productId);

    // if (item.inStock > cart.qty) {
    //   dispatch(
    //     addToCart({
    //       productId: product.productId,
    //       name: product.title,
    //       price: product.price,
    //       image: product.image,
    //       stock: product.inStock,
    //     })
    //   );
    // } else {
    //
    // }
  };

  const deleteItem = () => {
    // dispatch(removeItem(product.productId));
    dispatch(removeItemFromCart(product.id));
  };
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-5 grid-cols-2 my-3 justify-between items-start transition-all">
        <div
          className="img flex "
          style={{
            width: "70px",
            height: "70px",
          }}
        >
          <img
            src={product.products.image}
            style={{ objectFit: "cover" }}
            className="rounded"
            alt=""
          />
        </div>
        <div className="md:ml-4 text-gray-800">
          <h1 className="font-bold">{product.products.title}</h1>
          <p className="my-3  text-indigo-600 text-sm uppercase">
            {product.category}
          </p>
          <p
            className="text-pink-700 text-sm  cursor-pointer my-3 font-semibold"
            onClick={deleteItem}
          >
            REMOVE
          </p>
        </div>

        <div className="text-gray-800 md:mx-1">${product.products.price}</div>
        <div
          className="flex md:mx-5"
          style={{
            userSelect: "none",
          }}
        >
          <p
            onClick={decrementHandler}
            className="p-2 border hover:bg-gray-200 transition-all cursor-pointer"
          >
            -
          </p>
          <p className="py-2 px-5 border">{product.qty}</p>
          <p
            onClick={incrementHandler}
            className="p-2 border hover:bg-gray-200 transition-all cursor-pointer"
          >
            +
          </p>
        </div>
        <div className="">
          {product.products.price + " x " + product.qty} = ${" "}
          {(product.products.price * product.qty).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
