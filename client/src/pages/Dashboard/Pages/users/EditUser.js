import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import { toast, Zoom } from "react-toastify";
import Load from "../../../../components/Loading/Load";
import { editUserAction } from "../../../../store/actions/userActions";

const EditUser = ({ open, onCloseModal, user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, updatedUser, success, error } = useSelector(
    (state) => state.editUser
  );

  useEffect(() => {
    setUsername(user.userName);
    setEmail(user.email);
    setIsAdmin(user.previlage);
  }, [open]);

  const dispatch = useDispatch();

  const handleUserUpdate = (e) => {
    e.preventDefault();
    if (username.length < 6) {
      toast(`Username must be 6 chars long`, {
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
    } else {
      dispatch(editUserAction({ userId: user.userId, username, isAdmin }));
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          <h1 className="text-xl my-3 text-center font-bold">EDIT USER</h1>
          <form onSubmit={handleUserUpdate}>
            <div className="grid">
              <label htmlFor="id">user ID</label>
              <p className="p-2 border">{user.userId}</p>
            </div>
            <div className="grid my-2">
              <label htmlFor="email">Email address</label>
              <input
                className="border p-2 outline-none my-2"
                type="text"
                id="email"
                disabled={true}
                value={email}
              />
            </div>
            <div className="grid my-2">
              <label htmlFor="name">Username</label>
              <input
                className="border p-2 outline-none my-2"
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid my-2">
              <label htmlFor="name">User is admin</label>

              <div className="flex space-x-2 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 my-2 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(!isAdmin)}
                  checked={isAdmin}
                />
                <span
                  className={`${
                    isAdmin ? "bg-green-600" : "bg-red-600"
                  } px-2 font-bold text-white text-sm transition-all`}
                >
                  {isAdmin ? "TRUE" : "FALSE"}
                </span>
              </div>
              <div className="my-2"></div>
            </div>
            <div>
              <button
                disabled={loading}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {loading ? <Load /> : "UPDATE"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditUser;
