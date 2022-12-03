import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Load from "../../../../components/Loading/Load";
import {
  getCats,
  productView,
  updateProduct,
} from "../../../../store/actions/productActions";

const EditProduct = ({ open, onCloseModal, id, setOpenSearch }) => {
  const dispatch = useDispatch();
  const {
    loading,
    product,
    successes,

    error,
  } = useSelector((state) => state.productView);
  const { data, success, loadingCats, errorCats } = useSelector(
    (state) => state.getCatsList
  );

  const { updateLoading, updateProductSuccess } = useSelector(
    (state) => state.editProduct
  );

  useEffect(() => {
    if (updateProductSuccess) {
      dispatch({
        type: "PRODUCT_EDIT_RESET",
      });
      toast(` ✅ Product updated successfuly`, {
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
  }, [updateProductSuccess]);

  const [catId, setCatId] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({});

  useEffect(() => {
    dispatch(productView(id));
    dispatch(getCats());
  }, [open, updateProductSuccess]);

  useEffect(() => {
    if (product?.result) {
      setName(product.result.title);
      setPrice(product.result.price);
      setStock(product.result.inStock);
      setDescription(product.result.description);
    }
  }, [open, product]);

  useEffect(() => {}, []);

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (name && price && description) {
      dispatch(
        updateProduct(id, file, {
          title: name,
          price,
          inStock: stock,
          description,
        })
      );
    } else {
      toast(`All fields should not be empty`, {
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

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          {loading || updateLoading ? (
            <Load size={6} />
          ) : error ? (
            <p className="text-red-500 text-center">
              Something went wrong please refresh.{" "}
            </p>
          ) : (
            <div className="w-full">
              <form
                onSubmit={handleUpdateProduct}
                className="p-8 my-3 mx-auto "
                style={{
                  width: "100%",
                }}
              >
                <h3 className="text-center text-xl mb-6 font-bold">
                  UPDATE PRODUCT #{id}
                </h3>
                <div className="top grid grid-cols-2 gap-3">
                  <div className="input-list grid">
                    <label className="font-median text-sm" htmlFor="title">
                      Product title
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                      id="title"
                      placeholder="ie. Ipad pro"
                    />
                  </div>
                  <div className="input-list grid">
                    <label className="font-median text-sm" htmlFor="price">
                      Price
                    </label>
                    <input
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                      id="price"
                      placeholder="ie. $12.99"
                    />
                  </div>
                </div>
                <div className="input-list grid">
                  <label className="font-median text-sm" htmlFor="stock">
                    Stock quantity
                  </label>
                  <input
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                    id="stock"
                    placeholder="ie. 99"
                  />
                </div>
                <div className="category-list">
                  <label
                    for="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Select category
                  </label>
                  <select
                    onChange={(e) => setCatId(e.target.value)}
                    id="countries"
                    className="bg-gray-50 b-2 mb-2 shadow-smorder border shadow-sm border-gray-300 outline-none  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {data &&
                      data.map((cat) => (
                        <option
                          className="p-2 "
                          key={cat.categoryId}
                          value={cat.categoryId}
                        >
                          {cat.type}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="grid my-3">
                  <label htmlFor="img my-1 font-bold text-sm">
                    Product image
                  </label>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div>
                  <label className="font-median text-sm" htmlFor="desc">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="desc"
                    className="w-full p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                    placeholder="Product description"
                    rows="8"
                  ></textarea>
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    UPDATE
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditProduct;
