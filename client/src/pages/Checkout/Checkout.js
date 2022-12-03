import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Load from "../../components/Loading/Load";
import Loading from "../../components/Loading/Loading";
import { mycart, removeItemFromCart } from "../../store/actions/cart";
import Error from "../../components/Error/";
import PaymentMethod from "../../components/Payment method/PaymentMethod";
import StripeCheckout from "react-stripe-checkout";
import { placeOrderAction } from "../../store/actions/ordersAction";

const Key =
  "pk_test_51JpEpaLfY3NMZSKpKgnAnlW4wr6xKmbF37btZNeuNhWmIiWMDqf6qHSN3wKoaVFFDB75nggbaqxilm0F0rwmuTQk007HsNq5Dc";

const Checkout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);
  const { data, loadingCart, successCart, error } = useSelector(
    (state) => state.myCart
  );

  const { removeSuccess } = useSelector((state) => state.removeCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartNo, setCartNo] = useState(0);
  useEffect(() => {
    if (userInfo && userInfo.token) {
      dispatch(mycart());
    } else {
      navigate("/login");
    }
  }, [userInfo, dispatch, removeSuccess]);

  const [openShipping, setOpenShipping] = useState(false);
  const onCloseModal = () => setOpenShipping(false);

  useEffect(() => {
    setCartNo(successCart ? data.reduce((a, b) => a + b.qty, 0) : cartNo);
  }, [successCart]);

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const { success, order } = useSelector((state) => state.placeOrder);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.orderId}`);
    }
  }, [success]);

  const cartItems = {};
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

  const { placeOrderLoading } = useSelector((state) => state.placeOrder);

  const handleProceed = async (token) => {
    console.log(token);
    if (token) {
      dispatch(
        placeOrderAction({
          id: token.id,
          amount: cartItems.totalPrice,
          description: `Recieved $${cartItems.totalPrice} from ${
            userInfo.username
          } at ${new Date()} `,
          shippingPrice: cartItems.shippingPrice.toFixed(2),
          phone_number: Number(shippingInfo.phone),
          products: data,
          totalPrice: cartItems.totalPrice,
          shippingAddress: `${shippingInfo.city}, ${shippingInfo.address}`,
          shippingPhone: shippingInfo.phone,
          itemsPrice: cartItems.itemsPrice.toFixed(2),
          tax_price: cartItems.taxPrice.toFixed(2),
        })
      );
    }
  };

  return (
    <>
      {loadingCart || placeOrderLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="md:flex md:justify-between xs:grid xs:grid-cols-1 mx-auto">
          <div
            className="p-2 mx-auto"
            style={{
              flexBasis: "70%",
            }}
          >
            <div className="shipping">
              <h1 className="font-bold text-xl text-blue-600">
                Address details
              </h1>
              <div>
                <div className="grid my-2">
                  <p className="font-medium">Your city</p>
                  <p> {shippingInfo.city}</p>
                </div>
                <div className="grid my-2">
                  <p className="font-medium">Your Address</p>
                  <p> {shippingInfo.address}</p>
                </div>
                <div className="grid my-2">
                  <p className="font-medium">Your Phone number</p>
                  <p> {shippingInfo.phone}</p>
                </div>
                <div className="grid my-2">
                  <Link to="/cart">
                    <p className="text-green-500 underline">
                      Change shipping info
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="order my-4">
              <h1 className="font-bold text-xl text-blue-600">Order details</h1>

              {data && !data.length ? (
                <p className="text-red-500">
                  You added no items in your basket.{" "}
                  <NavLink to={"/"} className="text-green-500 underline">
                    Home
                  </NavLink>
                </p>
              ) : (
                data &&
                data.map((order) => (
                  <div key={order.id} className="p-2">
                    <div
                      key={order.id}
                      className="grid grid-cols-5  justify-start space-x-1 items-center"
                    >
                      <div
                        className="img rounded mb-2"
                        style={{
                          width: "60px",
                          height: "50px",
                        }}
                      >
                        <img
                          src={order.products.image}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          className="rounded-lg"
                          alt=""
                        />
                      </div>
                      <div className="title">{order.products.title}</div>
                      <div className="price">
                        ${order.products.price + " x " + order.qty}
                      </div>
                      <div>
                        TOTAL = ${(order.products.price * order.qty).toFixed(2)}
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleRemove(order.id)}
                          className="h-5 w-5 cursor-pointer"
                          viewBox="0 0 20 20"
                          fill="red"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
          <div style={{ flexBasis: "25%" }}>
            {cartItems.totalPrice > 0 && (
              <div className="summury">
                <h3
                  className="text-xl font-median text-center py-5 mb-4"
                  style={{ borderBottom: "1px solid silver" }}
                >
                  YOUR PURCHASE
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
                        $
                        {cartItems.itemsPrice &&
                          cartItems.itemsPrice.toFixed(2)}
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 my-3">
                      <h1>Payment status</h1>
                      <h1 className="text-sm inline-block rounded shodow-md my-1">
                        <span className="bg-red-600 font-medium inline-block px-2 bad font-semi-bold text-white rounded">
                          NOT PAID
                        </span>
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 my-3">
                      <h1>Delivery status</h1>
                      <h1 className="text-sm inline-block rounded shodow-md my-1">
                        <span className="bg-red-600 font-medium inline-block px-2 bad font-semi-bold text-white rounded">
                          NOT DELIVERED
                        </span>
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
                      <div>
                        <button
                          onClick={() => setOpenShipping(!openShipping)}
                          className="bg-slate-900 w-full p-2 shadow-md text-cyan-400 text-sm hover:bg-slate-800 transition-all rounded "
                        >
                          PAY WITH LOCAL PAYMENT
                        </button>
                      </div>

                      <div>
                        <StripeCheckout
                          email={userInfo.email}
                          name="Mahuraan Collections"
                          amount={cartItems.totalPrice * 100}
                          currency="USD"
                          stripeKey={Key}
                          token={handleProceed}
                        >
                          <button className="bg-slate-900 w-full shadow-md mt-3 p-2 text-cyan-400 text-sm hover:bg-slate-800 transition-all rounded ">
                            PAY WITH CARD
                          </button>
                        </StripeCheckout>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <PaymentMethod
            open={openShipping}
            onCloseModal={onCloseModal}
            totalAmount={cartItems.totalPrice}
          />
        </div>
      )}
    </>
  );
};

export default Checkout;
