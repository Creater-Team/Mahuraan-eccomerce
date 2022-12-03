import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToCartWithUser, mycart } from "../../store/actions/cart";
import { Link, useNavigate } from "react-router-dom";
import { addToFav } from "../../store/actions/favActions";
import { removeFav } from "../../store/actions/favActions";
import Ratings from "../Rating/Rating";
import Load from "../Loading/Load";

const Product = ({ pro }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);
  const { userInfo } = useSelector((state) => state.user);
  const { data, successCart } = useSelector((state) => state.myCart);
  const { loading } = useSelector((state) => state.addMyCart);

  const [inCart, setInCart] = useState(false);
  const [inFavs, setInFavs] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { refresh, successAddToCart } = useSelector((state) => state.addMyCart);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(mycart());
    if (data && data.length && !refresh) {
      setIsLoading(false);
      setInCart(data.find((x) => x.productId === pro.productId));
    }
  }, [refresh]);

  useEffect(() => {
    if (successCart) {
      setInCart(
        data ? data.find((x) => x.productId === pro.productId) : inCart
      );
    }
  }, [successCart]);

  useEffect(() => {
    if (successAddToCart) {
      dispatch(mycart());
      setIsLoading(false);
      setInCart(
        data ? data.find((x) => x.productId === pro.productId) : inCart
      );
    }
  }, [successAddToCart]);

  const handleAddToCart = () => {
    if (userInfo?.userId) {
      setIsLoading(true);
      dispatch(addToCartWithUser(pro.productId));
      dispatch(mycart());
    } else {
      navigate("/login");
    }
  };

  const addToFavorites = () => {
    dispatch(addToFav(pro));
  };

  const removeFavHandler = () => {
    dispatch(removeFav(pro.productId));
  };

  useEffect(() => {
    setInFavs(
      favorites?.productId &&
        favorites.find((x) => x.productId === pro.productId)
    );
  }, [favorites]);

  const allRatings = pro.reviews.length;
  const totalRatings = pro.reviews.reduce((a, b) => a + b.rating, 0);
  const result = totalRatings / allRatings;

  return (
    <div className="shadow-md py-4 rounded" style={{ userSelect: "none" }}>
      <Link to={`/products/${pro.productId}`}>
        <div
          className="rounded"
          style={{
            height: "250px",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            className="rounded"
            src={pro.image}
            alt=""
          />
        </div>
      </Link>
      {/* info part */}
      <div className="p-3 text-gray-800">
        <div className="top flex items-center justify-between relative">
          <Link to={`/products/${pro.productId}`}>
            <h1 className="">{pro.title}</h1>
          </Link>
          <div
            className="absolute"
            style={{
              bottom: "240px",
              right: 0,
            }}
          >
            {inFavs ? (
              <svg
                onClick={removeFavHandler}
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all h-10 w-10 text-pink-500 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                onClick={addToFavorites}
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 cursor-pointer transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="my-3 inline-block">
          <h2
            className="font-bold text-xs border-solid border border-gray-200 
         text-blue-700 p-2 rounded uppercase"
          >
            {pro.category.type}
          </h2>
        </div>
        {/* rating */}

        <div className="stars flex text-yellow-400">
          <Ratings rating={result} text={allRatings} />
        </div>

        {/* price */}

        <div className="mt-2">
          <h2 className="text-pink-700 text-md font-semibold">${pro.price}</h2>
        </div>
        {/* button */}
        <div className="my-3 text-xl flex justify-between items-center relative">
          <div className="cartBtns absolute pt-6 bottom-20 right-0">
            {inCart ? (
              <Link to="/cart">
                {" "}
                <button className="py-2 shadow-md px-5 text-sm rounded bg-pink-600 hover:bg-white hover:border transition-all border text-white hover:text-black">
                  Go to cart
                </button>
              </Link>
            ) : isLoading ? (
              <button>
                <p className="flex">
                  <Load size={3} />
                </p>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="py-2 shadow-md  text-sm rounded px-4 bg-pink-600 hover:bg-white hover:border transition-all border text-white hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
