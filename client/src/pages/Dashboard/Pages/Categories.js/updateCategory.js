import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Load from "../../../../components/Loading/Load";
import {
  getCats,
  productView,
  updateCategoryAction,
  updateProduct,
} from "../../../../store/actions/productActions";

const EditCategory = ({ open, onCloseModal, category }) => {
  const { type, img, categoryId } = category;

  const [catType, setCatType] = useState();
  const [CatImg, setCatImg] = useState();

  useEffect(() => {
    setCatType(type);
    setCatImg(img);
  }, [open]);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction(catType, CatImg, categoryId));
  };
  const { loading, successUpdateCategory } = useSelector(
    (state) => state.updateCategory
  );

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          <h3 className="text-center text-xl mb-6 font-bold">EDIT CATEGORY</h3>
          <form
            onSubmit={handleEdit}
            className="p-8 shadow-sm mt-8 mx-auto "
            style={{
              width: "60%",
            }}
          >
            <div className="input-list grid">
              <label className="font-median text-sm" htmlFor="price">
                Category id
              </label>
              <input
                required
                value={categoryId}
                disabled={true}
                type="text"
                className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                id="price"
                placeholder="ie. Stationary"
                autoComplete="off"
              />
            </div>
            <div className="input-list grid">
              <label className="font-median text-sm" htmlFor="price">
                Type
              </label>
              <input
                required
                value={catType}
                onChange={(e) => setCatType(e.target.value)}
                type="text"
                className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                id="price"
                placeholder="ie. Stationary"
                autoComplete="off"
              />
            </div>
            <div className="input-list grid">
              <label className="font-median text-sm" htmlFor="price">
                Image URL
              </label>
              <input
                required
                value={CatImg}
                onChange={(e) => setCatImg(e.target.value)}
                type="text"
                className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
                id="price"
                placeholder="image URL"
                autoComplete="off"
              />
            </div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {loading ? <Load size={6} /> : "EDIT"}
              </span>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditCategory;
