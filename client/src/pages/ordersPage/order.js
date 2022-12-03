import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { getOrderAction } from "../../store/actions/ordersAction";
import moment from "moment";
import OrderItems from "./OrderItems";
import ReactToPrint from "react-to-print";
import { mycart } from "../../store/actions/cart";
import { PLACE_ORDER_RESET } from "../../store/constants/orderConsts";

const Order = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, order, error, success } = useSelector(
    (state) => state.getOrder
  );

  useEffect(() => {
    dispatch(getOrderAction(id));
    dispatch(mycart());
    dispatch({
      type: PLACE_ORDER_RESET,
    });
  }, []);
  const componentRef = useRef();
  return (
    <div className="flex justify-center">
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">
          Looks like you're in a wrong path.{" "}
          <a href="/" className="text-slate-900 underline">
            Go Home
          </a>{" "}
        </p>
      ) : (
        success && (
          <div className=" shadow-sm w-full">
            <ReactToPrint
              trigger={() => (
                <button className="bg-slate-900 text-white px-3 py-1 rounded hover:text-sky-200 transition-all my-3">
                  Print reciept
                </button>
              )}
              content={() => componentRef.current}
            />
            <div className=" p-9" ref={componentRef}>
              <div className="header text-center">
                <h1 className="text-3xl md:text-3xl text-slate-800 w-full font-medium">
                  Mahuraan online shop
                </h1>
                <p className="text-sm">
                  TEL || 0633162382 || 0633049944 || 0636834820 || 0636539685
                </p>
              </div>
              <div className="info ">
                <div className="flex justify-end space-x-8">
                  <p className="font-bold text-xl">Invoice #</p>

                  <p>{order.orderId}</p>
                </div>
                <div className="flex justify-end space-x-8">
                  <p> {moment().format("LLL")}</p>
                </div>
                <div>
                  <p className="font-bold text-xl">Invoice to</p>
                  <p>{order.users.userName}</p>
                  <p>{order.users.email}</p>
                  <p>{order.shipping_address}</p>
                </div>
              </div>
              <div className="status mt-3">
                <p className="text-md">
                  {order.is_paid ? (
                    <span className="bg-slate-900 font-medium inline-block px-2 bad font-semi-bold text-white rounded">
                      paid at : {moment(order.paidAt).format("LLL")}{" "}
                    </span>
                  ) : (
                    <span className="bg-red-600 font-medium inline-block px-2 bad font-semi-bold text-white rounded">
                      NOT PAID
                    </span>
                  )}
                </p>
                <p className="text-md my-2">
                  {order.is_delivered ? (
                    <span className="bg-green-600 p-1 text-white text-sm">
                      Delivered at : {moment(order.deliveredAt).format("LLL")}{" "}
                    </span>
                  ) : (
                    <span className="bg-red-600 font-medium inline-block px-2 bad font-semi-bold text-white rounded">
                      NOT DELIVERED
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-4 ">
                {/* <h1 className="font-extrabold">Ordered Items</h1> */}
                <OrderItems products={order.products} />{" "}
              </div>
              <div className="finsum font-medium mt-3 text-sm">
                <div className="flex justify-end space-x-4">
                  <h1>SUB TOTAL</h1>
                  <h1>${order.items_price}</h1>
                </div>
                <div className="flex justify-end space-x-4">
                  <h1>TAX:</h1>
                  <h1>${order.tax_price}</h1>
                </div>
                <div className="flex justify-end space-x-4">
                  <h1>SHIPPING :</h1>
                  <h1>${order.shipping_price}</h1>
                </div>
                <hr />
                <div className="flex justify-end space-x-4">
                  <h1>TOTAL :</h1>
                  <h1>${order.totalPrice}</h1>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Order;
