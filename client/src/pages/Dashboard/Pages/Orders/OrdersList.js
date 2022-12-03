import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Modal } from "react-responsive-modal";
import { getAllProducts } from "../../../../store/actions/productActions";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../../../store/actions/ordersAction";
import moment from "moment";
import EditOrder from "./EditOrder";

const OrdersList = ({ orders, getOrders }) => {
  const dispatch = useDispatch();

  const { editLoading, orderUpdated } = useSelector((state) => state.editOrder);

  useEffect(() => {
    if (orderUpdated) {
      dispatch(getOrders());
      dispatch({
        type: "RESET_ORDER_UPDATE",
      });
    }
  }, [orderUpdated]);

  const [openEditing, setOpenEditing] = useState(false);
  const onCloseModal = () => setOpenEditing(false);
  const [orderId, setorderId] = useState(23);

  const columns = [
    {
      name: <p className="fs-6">Order id</p>,
      selector: (row) => <p>{row.orderId}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Invoice to</p>,
      selector: (row) => <p>{row.users.userName}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Shipping to</p>,
      selector: (row) => <p>{row.shipping_address}</p>,
      sortable: true,
    },

    {
      name: <p className="fs-6">Created at</p>,
      selector: (row) => moment(row.createdAt).format("MMM Do YY"),
      sortable: true,
    },
    {
      name: <p className="fs-6">TOTAL</p>,
      selector: (row) => <>${row.totalPrice}</>,
      sortable: true,
    },
    {
      name: <p className="fs-6">PAID</p>,
      selector: (row) =>
        row.is_paid ? (
          <span className="text-sm bg-green-600 font-bold  text-white px-2 shadow-sm">
            YES
          </span>
        ) : (
          <span className="text-sm bg-red-600  font-bold text-white px-2 shadow-sm">
            NO
          </span>
        ),
      sortable: true,
    },
    {
      name: <p className="fs-6">DELIVERED</p>,
      selector: (row) =>
        row.is_delivered ? (
          <span className="text-sm bg-green-600 font-bold text-white px-2 shadow-sm">
            YES
          </span>
        ) : (
          <span className="text-sm bg-red-600  font-bold  text-white px-2 shadow-sm">
            NO
          </span>
        ),
      sortable: true,
    },

    {
      name: <p className="fs-6"></p>,
      selector: (row) => (
        <div className="p-3">
          <div>
            <Link to={`/products/${row.orderId}`}>
              <button
                onClick={(e) =>
                  dispatch({
                    type: "IS_NOT_ADMIN",
                  })
                }
                className="bg-indigo-700 p-2 rounded-l  hover:bg-indigo-800 transition-all text-white"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </Link>
            <button
              onClick={() => {
                setOpenEditing(!openEditing);
                setorderId(row.orderId);
              }}
              className="bg-green-500 p-2  hover:bg-green-600 transition-all text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button className="bg-red-600 p-2 rounded-r  hover:bg-red-700 transition-all text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTableExtensions
        columns={columns}
        data={orders}
        filter={false}
        export={false}
      >
        <DataTable
          columns={columns}
          data={orders}
          defaultSortField="Product id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>

      <EditOrder open={openEditing} onCloseModal={onCloseModal} id={orderId} />
    </div>
  );
};

export default OrdersList;
