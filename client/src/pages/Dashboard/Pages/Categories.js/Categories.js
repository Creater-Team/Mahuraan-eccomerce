import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import Error from "../../../../components/Error";
import { getCats } from "../../../../store/actions/productActions";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import EditCategory from "./updateCategory";
import RemoveCategory from "./removeCategory";

const Categories = () => {
  const { loadingCats, data, errorCats } = useSelector(
    (state) => state.getCatsList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCats());
  }, []);

  const [openEditing, setOpenEditing] = useState(false);
  const [category, setCategory] = useState({});
  const [openDel, setOpenDel] = useState(false);

  const { loading, deletedCategory, successDeleteCategory, error } =
    useSelector((state) => state.deleteCategory);

  const onCloseModal = () => {
    setOpenEditing(false);
    setOpenDel(false);
  };

  useEffect(() => {
    dispatch(getCats());
  }, [openEditing, successDeleteCategory]);

  const columns = [
    {
      name: <p className="fs-6">Category id</p>,
      selector: (row) => <p>{row.categoryId}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Category Type</p>,
      selector: (row) => <p>{row.type}</p>,
      sortable: true,
    },
    {
      name: <p className="fs-6">Category image</p>,
      selector: (row) => (
        <a
          href={row.img}
          target="_blank"
          className="flex items-center space-x-1 text-cyan-400 underline"
        >
          <span>View</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      ),
      sortable: true,
    },
    {
      name: <p className="fs-6"></p>,
      selector: (row) => (
        <>
          <div>
            <button
              onClick={() => {
                setOpenEditing(!openEditing);
                setCategory(row);
              }}
              className="bg-green-500 p-2 rounded-l  hover:bg-green-600 transition-all text-white"
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
                setOpenDel(!openDel);
                setCategory(row);
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
    <div className="container mx-auto p-4">
      <div className="float-right">
        <Link to="/admin/cats/new">
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
      <div>
        {loadingCats ? (
          <Loading />
        ) : errorCats ? (
          <Error />
        ) : (
          <>
            <DataTableExtensions
              columns={columns}
              data={data}
              filter={false}
              export={false}
            >
              <DataTable
                columns={columns}
                data={data}
                defaultSortField="Product id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </DataTableExtensions>
          </>
        )}
      </div>
      <EditCategory
        category={category}
        open={openEditing}
        onCloseModal={onCloseModal}
      />
      <RemoveCategory
        category={category}
        open={openDel}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

export default Categories;
