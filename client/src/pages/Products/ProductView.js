import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createRev,
  productRev,
  productView,
} from "../../store/actions/productActions";
import Loading from "../../components/Loading/Loading";
import Load from "../../components/Loading/Load";
import styles from "./product.module.css";
import Ratings from "../../components/Rating/Rating";
import { addToCart, addToCartWithUser, mycart } from "../../store/actions/cart";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import ShippingInfo from "../../components/ShippingComponent/ShippingInfo";

const ProductView = () => {
  const params = useParams();
  const { id } = params;
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { successReviews } = useSelector((state) => state.newRev);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productView(id));
  }, [dispatch]);

  useEffect(() => {
    if (successReviews) {
      dispatch(productView(id));
    }
  }, [dispatch, successReviews]);

  const [isAdded, setIsAdded] = useState(false);
  const [reviewsArr, setReviews] = useState([]);
  const [rating, setRating] = useState(3);
  const [body, setBody] = useState("");
  const { product, successes } = useSelector((state) => state.productView);
  const { reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (userInfo && userInfo.userId && reviews) {
      const reviewed = reviews.find(
        (x) => x.users.userId === userInfo.userId && x.productId === Number(id)
      );
      if (reviewed) {
        setBody(reviewed.body);
        setRating(reviewed.rating);
      }
    }
  }, [reviews, userInfo]);

  useEffect(() => {
    if (successes && product && product.result) {
      dispatch(productRev(product.result.productId));
    }
  }, [successes, dispatch]);

  useEffect(() => {
    if (!loading) {
      setReviews(reviews);
    }
  }, [loading, reviews]);

  const { successAddToCart, refresh, loadingAddToCart } = useSelector(
    (state) => state.addMyCart
  );

  const { data, successCart } = useSelector((state) => state.myCart);

  useEffect(() => {
    dispatch(mycart());
  }, [refresh, product]);

  useEffect(() => {
    if ((product && product.result && successes) || successCart) {
      setIsAdded(
        product &&
          product.result &&
          data &&
          data.find((x) => x.productId === product.result.productId)
      );
    }
  }, [refresh, product, successCart]);

  const handleAddToCart = () => {
    if (!userInfo?.userId) {
      // dispatch(
      //   addToCart({
      //     productId: product.result.productId,
      //     name: product.result.title,
      //     price: product.result.price,
      //     image: product.result.image,
      //     category: product.result.category.type,
      //     stock: product.result.inStock,
      //     qty: 1,
      //   })
      // );

      setOpen(true);
    } else {
      dispatch(addToCartWithUser(product.result.productId));
    }
  };

  useEffect(() => {
    if (product && product.result && product.result.productId) {
      setIsAdded(
        cartItems.find((x) => x.productId === product.result.productId)
      );
    }
  }, [cartItems, product]);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubReview = () => {
    if (product && product.result.productId) {
      dispatch(createRev(product.result.productId, Number(rating), body));
      setOpen(!open);
    }
  };

  return (
    <div className="container mx-auto">
      {product && product.result && product.success ? (
        <>
          <div className={`${styles.wrapper}`}>
            <div
              className={`${styles.img} rounded mr-4`}
              style={{
                height: "500px",
              }}
            >
              <img
                src={product.result.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                className="rounded"
                alt=""
              />
            </div>
            <div
              style={{
                flexBasis: "40%",
              }}
            >
              <h1 className="text-2xl">{product.result.title}</h1>
              {product.result.inStock ? (
                <p className="my-2 font-bold text-green-500">In stock</p>
              ) : (
                <p className="bg-red-600 shadow-md inline-block text-sm px-2 my-2 rounded-full text-white">
                  Unavailable
                </p>
              )}

              <div className="flex my-2">
                <p className="text-2xl font-bold text-purple-700">
                  $ {product.result.price}
                </p>
              </div>
              <div>
                <p className="text-justify">{product.result.description}</p>
              </div>
              <div className="my-3">
                <Ratings rating={product.average} text={product.average} />
              </div>
              {product.result.inStock ? (
                <>
                  {" "}
                  <div className="flex flex-col justify-start items-start">
                    {isAdded ? (
                      <Link to="/cart">
                        {" "}
                        <button className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-sm shadow-md text-white  px-3 py-2 rounded transition-all hover:bg-blue-600">
                          Go to cart
                        </button>
                      </Link>
                    ) : loadingAddToCart ? (
                      <button className="flex items-center justify-center space-x-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm shadow-md text-white  px-3 py-2 rounded transition-all hover:bg-blue-600">
                        <Load size={6} />
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center space-x-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm shadow-md text-white  px-3 py-2 rounded transition-all hover:bg-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>{" "}
                        Add to cart
                      </button>
                    )}
                    <button
                      onClick={onOpenModal}
                      className="border my-3 p-2 rounded"
                    >
                      Leave a review
                    </button>
                  </div>{" "}
                </>
              ) : (
                <p className="text-red-500">This will be available soon.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}

      <Modal open={open} onClose={onCloseModal}>
        {userInfo && userInfo.token ? (
          <div className="my-4 modal">
            <h2 className="text-2xl font-bold">Leave your review.</h2>
            <div className="text-center my-5 flex  justify-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={60}
                activeColor="#ffd700"
                value={rating}
              />
            </div>
            <form>
              <p>Your comment</p>
              <textarea
                name=""
                className=" border outline-none p-3 w-full"
                id=""
                placeholder="ie. I liked this item."
                // cols="38"
                rows="8"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required
              ></textarea>
            </form>

            <button
              onClick={handleSubReview}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                SEND REVIEW
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-6 modal">
            <h1 className="text-2xl text-pink-700 mb-3">Sign in required</h1>
            <p>You have to be signed in before proceeding.</p>
            <Link to="/login">
              <button className="p-2 my-4 bg-sky-600 l rounded shadow-md text-white">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </Modal>

      <div className="my-7">
        {reviewsArr && reviewsArr.length ? (
          <>
            <h2 className="my-5">Reviews</h2>

            {reviewsArr.map((rev, idx) => {
              return (
                <div key={idx} className="p-2">
                  <div className="header flex space-x-3 items-center">
                    <div className="img">
                      <img
                        src={rev.users.userPhoto}
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        className="rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="name">{rev.users.userName}</div>
                    <p>
                      <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {moment(rev.updatedAt).fromNow()}
                      </span>
                    </p>
                  </div>

                  <div className="body py-2">
                    <Ratings rating={rev.rating} text={rev.rating} />
                    <p>
                      {rev.body ? (
                        <p className="text-slate-800">{rev.body}</p>
                      ) : (
                        <p className="text-gray-500">No preview was provided</p>
                      )}
                    </p>
                  </div>

                  <hr />
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductView;
