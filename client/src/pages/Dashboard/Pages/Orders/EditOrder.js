import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Load from "../../../../components/Loading/Load";
import {
  editOrderByAdmin,
  orderByAdmin,
} from "../../../../store/actions/ordersAction";

const EditOrder = ({ open, onCloseModal, id }) => {
  const { loading, order, error, success } = useSelector(
    (state) => state.getOrderByAdmin
  );
  const { editLoading, orderUpdated } = useSelector((state) => state.editOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderByAdmin(id));

    if (orderUpdated) {
      dispatch(orderByAdmin(id));
    }
  }, [open]);

  useEffect(() => {
    if (orderUpdated) {
      dispatch(orderByAdmin(id));
      dispatch({
        type: "RESET_ORDER_UPDATE",
      });
    }
  }, [orderUpdated]);

  const [delivery, setDelivery] = useState(false);
  useEffect(() => {
    if (success) {
      setDelivery(order && order.is_delivered ? true : false);
    }
  }, [success]);

  const [pay, setPay] = useState(false);
  useEffect(() => {
    if (success) {
      setPay(order && order.is_paid ? true : false);
    }
  }, [success]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editOrderByAdmin(id, delivery, pay));
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          {loading ? (
            <Load size={6} />
          ) : error ? (
            <p className="text-red-500 text-center">
              Something went wrong please refresh.{" "}
            </p>
          ) : (
            order && (
              <>
                <h3 className="text-center text-xl mb-6 font-bold">
                  Edit order #{id}
                </h3>
                <div className="pb-4 text-right">
                  {order.is_paid ? (
                    <span className="text-sm bg-green-600 text-white px-2 shadow-sm">
                      PAID
                    </span>
                  ) : (
                    <span>not paid</span>
                  )}
                  <div>
                    {order.is_delivered ? (
                      <span className="text-sm bg-green-600 text-white px-2 shadow-sm">
                        DELIVERED
                      </span>
                    ) : (
                      <span className="text-sm bg-red-600 text-white px-2 shadow-sm">
                        NOT DELIVERED
                      </span>
                    )}
                  </div>
                </div>

                <form onSubmit={handleUpdate}>
                  <div className="input-list grid">
                    <label className="font-median text-sm" htmlFor="stock">
                      Invoice to
                    </label>
                    <input
                      value={order.users.userName.toUpperCase()}
                      disabled
                      type="text"
                      className="p-2 outline-none border-solid border shadow-sm my-1 border-gray-300 rounded"
                      id="stock"
                      placeholder="ie. 99"
                    />
                  </div>
                  <div className="input-list grid">
                    <label className="font-median text-sm" htmlFor="stock">
                      Phone number
                    </label>
                    <input
                      value={order.phone_number}
                      disabled
                      type="text"
                      className="p-2 outline-none border-solid border shadow-sm my-1 border-gray-300 rounded"
                      id="stock"
                      placeholder="ie. 99"
                    />
                  </div>
                  <div className="input-list grid">
                    <label className="font-median text-sm" htmlFor="stock">
                      Delivery
                    </label>
                    <select
                      value={delivery ? "DELIVERED" : "NOT DELIVERED"}
                      onChange={(e) => setDelivery(!delivery)}
                      type="text"
                      className="p-2 outline-none border-solid border shadow-sm my-1 border-gray-300 rounded"
                      id="stock"
                      placeholder="ie. 99"
                    >
                      <option>DELIVERED</option>
                      <option>NOT DELIVERED</option>
                    </select>
                  </div>
                  <div className="input-list grid mt-3">
                    <label className="font-median text-sm" htmlFor="stock">
                      Payment
                    </label>
                    <select
                      value={pay ? "PAID" : "NOT PAID"}
                      onChange={(e) => setPay(!pay)}
                      type="text"
                      className="p-2 outline-none border-solid border shadow-sm my-1 border-gray-300 rounded"
                      id="stock"
                      placeholder="ie. 99"
                    >
                      <option>PAID</option>
                      <option>NOT PAID</option>
                    </select>
                  </div>

                  <button className="relative my-3 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      {editLoading ? <Load size={6} /> : "UPDATE"}
                    </span>
                  </button>
                </form>
              </>
            )
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditOrder;
