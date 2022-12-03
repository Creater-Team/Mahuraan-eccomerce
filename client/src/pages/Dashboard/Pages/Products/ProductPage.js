import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Modal } from "react-responsive-modal";
import { getAllProducts } from "../../../../store/actions/productActions";
import Loading from "../../../../components/Loading/Loading";
import Error from "../../../../components/Error";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import SearchProduct from "./SearchProduct";
import DeleteItem from "./DeleteItem";
import { toast, Zoom } from "react-toastify";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.allProducts
  );

  const { successDelete } = useSelector((state) => state.deleteItem);

  const [openEditing, setOpenEditing] = useState(false);
  const [productId, setProductId] = useState(23);
  const [product, setProduct] = useState({});
  const [openDel, setOpenDel] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const onCloseModal = () => {
    setOpenEditing(false);
    setOpenSearch(false);
    setOpenDel(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch({
      type: "PRODUCT_CREATE_RESET",
    });
    if (successDelete) {
      dispatch({
        type: "RESET_DELETE",
      });
      toast(` ✅ DELETED SUCCESSFULY`, {
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
  }, [dispatch, openEditing, openSearch, successDelete]);

  const columns = [
    {
      name: <p className="fs-6">Product id</p>,
      selector: (row) => <p>{row.productId}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Product title</p>,
      selector: (row) => <p>{row.title}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Category</p>,
      selector: (row) => <p>{row.category.type}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Product price</p>,
      selector: (row) => <>${row.price}</>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Stock</p>,
      selector: (row) => row.inStock,
      sortable: true,
    },

    {
      name: <p className="fs-6"></p>,
      selector: (row) => (
        <>
          <div>
            <Link to={`/products/${row.productId}`}>
              <button
                onClick={(e) =>
                  dispatch({
                    type: "IS_NOT_ADMIN",
                  })
                }
                className="bg-indigo-700 p-2 rounded-l  hover:bg-indigo-800 transition-all text-white"
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
                setProductId(row.productId);
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
            <button
              onClick={() => {
                setOpenDel(!openEditing);
                setProduct(row);
              }}
              className="bg-red-600 p-2 rounded-r  hover:bg-red-700 transition-all text-white"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="container mx-auto">
      {loading ? (
        <>
          <Loading />
        </>
      ) : error ? (
        <>
          <Error />
        </>
      ) : (
        <div
          style={{
            margin: "auto",
            width: "90%",
          }}
        >
          <div className="search flex justify-center p-4 text-gray-400">
            <div className="w-full flex justify-center">
              <button
                onClick={() => setOpenSearch(true)}
                className="px-5 border mt-4 text-left py-2"
                style={{
                  width: "40%",
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="float-right">
            <Link to="/admin/product/new">
              <button className="bg-indigo-600 space-x-2 shadow-md items-center px-3 hover:bg-indigo-500 transition-all text-sm flex float-right my-4 p-2 mx-2 rounded-sm text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>CREATE</span>
              </button>
            </Link>
          </div>
          <div className="shadow-md">
            <DataTableExtensions
              columns={columns}
              data={products}
              filter={false}
              export={false}
            >
              <DataTable
                columns={columns}
                data={products}
                defaultSortField="Product id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
        </div>
      )}
      <EditProduct
        id={productId}
        open={openEditing}
        onCloseModal={onCloseModal}
        setOpenSearch={setOpenSearch}
      />
      <DeleteItem
        product={product}
        open={openDel}
        setOpenDel={setOpenDel}
        onCloseModal={onCloseModal}
      />
      <SearchProduct
        products={products}
        open={openSearch}
        onCloseModal={onCloseModal}
        setOpen={setOpenSearch}
      />
    </div>
  );
};

export default ProductPage;
