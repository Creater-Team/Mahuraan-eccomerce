import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Load from "../../../../components/Loading/Load";
import Error from "../../../../components/Error";
import { createCategoryAction } from "../../../../store/actions/productActions";

const NewCategory = () => {
  const dispatch = useDispatch();
  const { loadingCreate, createdCategory, error, success } = useSelector(
    (state) => state.newCategory
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate(`/admin/cats`);
      dispatch({
        type: "CATEGORY_CREATE_RESET",
      });
    }
  }, [success]);

  const [type, setType] = useState("");
  const [img, setImg] = useState("");

  const handleCreateCategory = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(type, img));
  };

  return (
    <div className="p-2 container mx-auto">
      <h3 className="text-center text-xl mb-6 font-bold">NEW CATEGORY</h3>
      <form
        onSubmit={handleCreateCategory}
        className="p-8 shadow-md mt-8 mx-auto "
        style={{
          width: "60%",
        }}
      >
        <div className="input-list grid">
          <label className="font-median text-sm" htmlFor="price">
            Type
          </label>
          <input
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text"
            className="p-2 outline-none border-solid border shadow-sm my-3 border-gray-300 rounded"
            id="price"
            placeholder="image URL"
            autoComplete="off"
          />
        </div>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {loadingCreate ? <Load size={6} /> : "SAVE"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
