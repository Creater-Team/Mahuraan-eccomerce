import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ShippingInfo from "../../components/ShippingComponent/ShippingInfo";
import { mycart } from "../../store/actions/cart";
import CartItem from "./cartItem";
import Load from "../../components/Loading/Load";
import KeepShopping from "./KeepShopping";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { data, successCart, loadingCart } = useSelector(
    (state) => state.myCart
  );

  cartItems.totalItems =
    successCart && data && data.reduce((a, b) => a + b.qty, 0);
  cartItems.itemsPrice =
    successCart &&
    data &&
    data.reduce((a, b) => a + b.products.price * b.qty, 0);

  cartItems.taxPrice = cartItems.itemsPrice * 0.05;
  cartItems.shippingPrice =
    cartItems.itemsPrice > 200 ? 0 : cartItems.itemsPrice * 0.025;
  cartItems.totalPrice = (
    cartItems.itemsPrice +
    cartItems.taxPrice +
    cartItems.shippingPrice
  ).toFixed(2);

  const { removeSuccess } = useSelector((state) => state.removeCart);
  const { updateSuccess } = useSelector((state) => state.updateCart);
  const { refresh } = useSelector((state) => state.addMyCart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(mycart());
  }, [removeSuccess, updateSuccess]);

  const [openShipping, setOpenShipping] = useState(false);
  const onCloseModal = () => setOpenShipping(false);

  const [cartNo, setCartNo] = useState(0);

  useEffect(() => {
    setCartNo(
      !refresh && successCart ? data.reduce((a, b) => a + b.qty, 0) : cartNo
    );
  }, [refresh, successCart]);

  return (
    <div className="mt-5 mx-auto md:flex justify-between items-start">
      {(data && !data.length) || !userInfo.token ? (
        <KeepShopping />
      ) : (
        <>
          {" "}
          <div className="basis-9/12 ">
            <div
              className="flex justify-between py-5 items-center"
              style={{ borderBottom: "1px solid silver" }}
            >
              <h3 className="text-xl font-median">Shopping Cart</h3>
              <h3 className="text-xl font-median">{cartNo} Item(s)</h3>
            </div>
            <div className="products mt-5">
              {loadingCart ? (
                <Load size={6} />
              ) : (
                data &&
                data.map((product, idx) => (
                  <div key={idx}>
                    {" "}
                    <CartItem product={product} />
                    <hr />
                  </div>
                ))
              )}
            </div>

            <div className="my-8">
              <Link className="text-blue-700 flex items-center" to="/">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>{" "}
                Contineu Shopping
              </Link>
            </div>
          </div>
          <div className="summury" style={{ flexBasis: "20%" }}>
            <h3
              className="text-xl font-median text-center py-5 mb-4"
              style={{ borderBottom: "1px solid silver" }}
            >
              Order Summary
            </h3>
            {loadingCart ? (
              <Load size={4} />
            ) : (
              <>
                {" "}
                <div className="grid grid-cols-2 my-3">
                  <h1> Quantity</h1>
                  <h1>
                    {" "}
                    ({cartNo}) {cartNo > 1 ? "Units" : "Unit"}
                  </h1>
                </div>
                <div className="grid grid-cols-2 my-3">
                  <h1> Items price</h1>
                  <h1>
                    ${cartItems.itemsPrice && cartItems.itemsPrice.toFixed(2)}
                  </h1>
                </div>
                <div className="grid grid-cols-2 my-3">
                  <h1>Shipping price</h1>
                  <h1>${cartItems.shippingPrice.toFixed(2)}</h1>
                </div>
                <div className="grid grid-cols-2 my-3">
                  <h1>Tax price</h1>
                  <h1>${cartItems.taxPrice.toFixed(2)}</h1>
                </div>
                <div className="grid grid-cols-2 my-3">
                  <h1>TOTAL</h1>
                  <h1>${cartItems.totalPrice}</h1>
                </div>
                <div className="my-3">
                  <button
                    onClick={() => setOpenShipping(true)}
                    className="text-center w-full  py-2 text-xl text-white rounded transition-all bg-gradient-to-r from-purple-500 to-pink-500 hover:to-pink-400"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
          <ShippingInfo
            cart={data}
            open={openShipping}
            onCloseModal={onCloseModal}
          />
        </>
      )}
    </div>
  );
};

export default CartPage;
