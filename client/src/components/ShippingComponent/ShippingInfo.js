import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { addShippingInfo, removeShippingInfo } from "../../store/actions/cart";

const ShippingInfo = ({ open, onCloseModal, cart }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const { shippingInfo, success } = useSelector((state) => state.shippingInfo);

  useEffect(() => {
    if (shippingInfo && shippingInfo.city) {
      setCity(shippingInfo.city);
      setPhone(shippingInfo.phone);
      setAddress(shippingInfo.address);
    }
  }, [shippingInfo]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingInfo = (e) => {
    e.preventDefault();
    const data = {
      city,
      phone,
      address,
    };
    dispatch(addShippingInfo(data));
    if (cart.length) {
      navigate("/place-order");
    } else {
      toast(`Can't proceed with empty cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const clearFormHandler = () => {
    dispatch(removeShippingInfo());
    setPhone("");
    setCity("");
    setAddress("");
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        {userInfo && userInfo.token ? (
          <div className="my-4 modal">
            <h2 className="text-2xl font-bold">SHIPPING INFO</h2>

            <div className="my-5">
              <form onSubmit={handleShippingInfo}>
                <div className="grid">
                  <label htmlFor="city">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    type="text"
                    className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                    id="city"
                    placeholder="ie. Hargeisa"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="address">Address</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    type="text"
                    className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                    id="address"
                    placeholder="ie. 26 june"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="address">Shipping phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="number"
                    className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                    id="address"
                    placeholder="ie. 0634xxxxxxx"
                  />
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Proceed
                  </span>
                </button>
                {shippingInfo && shippingInfo.city && (
                  <button
                    onClick={clearFormHandler}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Reset
                    </span>
                  </button>
                )}
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <h1 className="text-2xl text-pink-700 mb-3">Sign in required</h1>
              <p>You have to sign in before proceeding to checkout.</p>
              <Link to="/login">
                <button className="p-2 my-4 bg-slate-800 text-white">
                  Please, login
                </button>
              </Link>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ShippingInfo;
