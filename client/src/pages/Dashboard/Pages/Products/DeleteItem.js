import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import Load from "../../../../components/Loading/Load";
import { deleteProduct } from "../../../../store/actions/productActions";

const DeleteItem = ({ product, open, onCloseModal, setOpenDel }) => {
  const { deleteLoading, successDelete, error } = useSelector(
    (state) => state.deleteItem
  );

  useEffect(() => {
    if (successDelete) {
      setOpenDel(false);
    }
  }, [successDelete]);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(product.productId));
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          <h2 className="text-2xl font-bold text-red-600">
            REMOVE #{product.productId}
          </h2>
          <div className="my-6">
            <p>
              Are you sure you want to delete{" "}
              <span className="text-pink-600 underline">{product.title}</span> ?{" "}
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {deleteLoading ? <Load size={5} /> : "Yes, i am sure"}
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteItem;
