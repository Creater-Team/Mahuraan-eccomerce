import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Load from "../../../../components/Loading/Load";
import Error from "../../../../components/Error";
import {
  createProduct,
  getCats,
} from "../../../../store/actions/productActions";
import Loading from "../../../../components/Loading/Loading";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { data, success, loadingCats, errorCats } = useSelector(
    (state) => state.getCatsList
  );

  const { loadingCreate, createProductSuccess, createdProduct } = useSelector(
    (state) => state.createPro
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCats());
  }, []);

  useEffect(() => {
    if (createProductSuccess && createdProduct && createdProduct.productId) {
      navigate(`/admin/product`);
    }
  }, [createProductSuccess]);

  const [catId, setCatId] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({});

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (name && price && stock && description) {
      dispatch(
        createProduct(file, {
          title: name,
          price,
          inStock: stock,
          categoryId: catId,
          description,
        })
      );
    }
  };

  return (
    <div className="p-2 container mx-auto">
      {loadingCats ? (
        <Loading />
      ) : errorCats ? (
        <Error />
      ) : (
        <>
          {" "}
          {/* <div className="flex text-xl text-indigo-500 ">
            <Link to="/admin/product">products</Link>
            <div>/</div>
            <Link to="/admin/product/new">new</Link>
          </div> */}
          <div>
            <Link to="/admin/product" className="underline text-sky-500">
              Go back
            </Link>
            <form
              onSubmit={handleCreateProduct}
              className="p-8 shadow-md mt-8 mx-auto "
              style={{
                width: "60%",
              }}
            >
              <h3 className="text-center text-xl mb-6 font-bold">
                NEW ITEM REGISTRATION
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
                <label htmlFor="img my-3 font-bold text-sm">
                  Product image
                </label>
                <input
                  required
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
              <button
                disabled={loadingCreate}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {loadingCreate ? <Load size={6} /> : "SAVE"}
                </span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewProduct;
