import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Load from "../../../../components/Loading/Load";
import { deleteCategoryAction } from "../../../../store/actions/productActions";

const RemoveCategory = ({ open, onCloseModal, category }) => {
  const { type, img, categoryId } = category;

  useEffect(() => {}, [open]);
  const dispatch = useDispatch();

  const { loading, deletedCategory, successDeleteCategory, error } =
    useSelector((state) => state.deleteCategory);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategoryAction(categoryId));
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
  };

  useEffect(() => {
    if (successDeleteCategory) {
      onCloseModal();
      dispatch({
        type: "CATEGORY_REMOVE_SUCCESS",
      });
    }
  }, [successDeleteCategory]);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          <h2 className="text-xl font-bold text-red-600">
            REMOVE CATEGORY ID : {categoryId}
          </h2>
          <div className="my-6">
            <p className="my-6">
              Are you sure you want to delete{" "}
              <span className="text-pink-600 underline">{type}</span> category ?{" "}
            </p>
            <span className="text-pink-600 font-bold">
              WARNING <br />
            </span>
            All products associated with this category will be also deleted.
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {loading ? <Load size={6} /> : "Yes, i am sure"}
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RemoveCategory;
