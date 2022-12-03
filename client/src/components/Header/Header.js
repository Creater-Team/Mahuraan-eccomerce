import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../store/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const { cartItems } = useSelector((state) => state.cart);
  const { data, successCart } = useSelector((state) => state.myCart);
  const [show, setShow] = useState(false);
  const [cartNo, setCartNo] = useState(0);
  const { refresh } = useSelector((state) => state.addMyCart);

  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const showHandler = () => {
    setShow(!show);
  };

  useEffect(() => {
    setCartNo(
      !refresh && successCart ? data.reduce((a, b) => a + b.qty, 0) : cartNo
    );
  }, [refresh, successCart]);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="mb-4">
      <div
        className="mx-auto hidden md:block "
        style={{
          width: "90%",
        }}
      >
        {" "}
        <nav className="navbar p-5 flex justify-between items-center w-full ">
          <div className="logo">
            <h3 className="text-3xl font-bold">
              <Link to="/">Mahuraan.</Link>
            </h3>
          </div>
          <div className="links">
            <ul className="flex space-x-8"></ul>
          </div>

          <div className="actions relative">
            <ul className="flex space-x-8">
              <li className="hover:text-purple-600 transition-all cursor-pointer">
                <Link to="/cart">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer h-6 w-6 text-slate-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <div
                    className="bg-pink-600 w-5 text-white text-sm text-center absolute bottom-3 rounded-full"
                    style={{
                      left: "14px",
                    }}
                  >
                    {cartNo}
                  </div>
                </Link>
              </li>
              <li className="hover:text-purple-600 transition-all cursor-pointer">
                <Link to="/favorites">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <div
                    className="bg-pink-600 w-5 text-white text-sm text-center absolute bottom-3 rounded-full"
                    style={{
                      left: "70px",
                    }}
                  >
                    {favorites.length}
                  </div>
                </Link>
              </li>{" "}
              {userInfo && userInfo.admin && (
                <li
                  onClick={() => {
                    dispatch({
                      type: "IS_ADMIN",
                    });
                    navigate("/dashboard");
                  }}
                  className="hover:text-purple-600 transition-all cursor-pointer"
                >
                  Dashboard
                </li>
              )}
              <li>
                {!userInfo?.userId ? (
                  <Link to="/login">Sign in</Link>
                ) : (
                  <p
                    onClick={handleLogout}
                    className="hover:text-red-600 transition-all flex space-x-1 cursor-pointer"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>

                    <span>Logout</span>
                  </p>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* mobile */}
      <div className="md:hidden mx-4">
        <nav className="navbar my-3 flex justify-between items-center w-full">
          <div className="logo text-3xl  font-extrabold">
            <Link to="/">
              {" "}
              Mahu<span>Raan.</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <div className="bg-pink-600 absolute w-5 text-center text-sm text-white rounded-full bottom-4 left-1">
              {favorites.length}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <div className="bg-pink-600 w-5 text-white text-sm text-center absolute bottom-4 right-8 rounded-full">
              {cartItems.reduce((a, b) => a + b.qty, 0)}
            </div>
            <svg
              onClick={showHandler}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 cursor-pointer w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </nav>

        {/* mobile nav */}
        {show && (
          <>
            <div className="absolute bg-slate-800 text-white p-3 rounded-full cursor-pointer z-30 right-9">
              <svg
                onClick={showHandler}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              className="bg-white border text-slate-900 absolute top-0 right-0 h-auto z-10"
              style={{
                width: "70%",
              }}
            >
              <div className="border flex items-center">
                <input
                  type="text"
                  placeholder="search"
                  className="outline-none p-3 basis-4/5 grow"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 cursor-pointer h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <ul className="flex flex-col justify-between items-start mx-3 my-5">
                <li className="my-3 font-bold">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="my-3 font-bold">HOME</li>
                <li className="my-3 font-bold">SHOP</li>
                <li className="my-3 font-bold">COLLECTION</li>
                <li className="my-3 font-bold">CONTACT US</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <hr />
    </div>
  );
};

export default Header;
