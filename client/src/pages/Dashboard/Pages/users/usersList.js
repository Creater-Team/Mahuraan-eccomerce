import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import Error from "../../../../components/Error";
import { fetchUsers } from "../../../../store/actions/userActions";
import moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";

const UsersList = () => {
  const { loading, users, error } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const { updatedUser, success } = useSelector((state) => state.editUser);
  const [user, setUser] = useState({});
  const [openEditing, setOpenEditing] = useState(false);
  const onCloseModal = () => setOpenEditing(false);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch({
      type: "RESET_UPDATE",
    });
    onCloseModal();
  }, [success]);

  const columns = [
    {
      name: <p>user id</p>,
      selector: (row) => <p>{row.userId}</p>,
      sortable: true,
    },
    {
      name: <p>Name</p>,
      selector: (row) => <p>{row.userName}</p>,
      sortable: true,
    },
    {
      name: <p>Email</p>,
      selector: (row) => <p>{row.email}</p>,
      sortable: true,
    },
    {
      name: <p>Admin</p>,
      selector: (row) => (
        <p>
          {row.previlage ? (
            <span className="bg-green-600 px-2 text-white font-bold">YES</span>
          ) : (
            <span className="bg-red-600 px-2 text-white font-bold">NO</span>
          )}
        </p>
      ),
      sortable: true,
    },
    {
      name: <p className="fs-6">Joined</p>,
      selector: (row) => moment(row.createdAt).format("LLL"),
      sortable: true,
    },
    {
      name: <p className="fs-6"></p>,
      selector: (row) => (
        <div className="p-3">
          <div>
            <button
              onClick={() => {
                setOpenEditing(!openEditing);
                setUser(row);
              }}
              className="bg-green-500 p-2  rounded-l hover:bg-green-600 transition-all text-white"
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
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="my-3 ">
          <div className="flex justify-center space-x-3 items-center">
            <h1 className="text-3xl text-center font-bold">SYSTEM USERS</h1>
            <span
              className="text-cyan-300 bg-black px-3 shadow-sm font-bold"
              style={{
                fontSize: "14px",
              }}
            >
              {users?.length && users.length} User(s)
            </span>
          </div>{" "}
          <div className="p-3 shadow-md">
            <DataTableExtensions
              columns={columns}
              data={users}
              filter={false}
              export={false}
            >
              <DataTable
                columns={columns}
                data={users}
                defaultSortField="Product id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
          <EditUser
            user={user}
            open={openEditing}
            onCloseModal={onCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default UsersList;
