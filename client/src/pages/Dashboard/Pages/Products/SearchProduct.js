import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import SearchItems from "./SearchItems";

const SearchProduct = ({ open, onCloseModal, products, setOpen }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length) {
      const product = products.filter(
        (x) =>
          x.productId.toString().includes(Number(search)) ||
          x.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setItems(product);
    } else {
      setItems([]);
    }
  }, [search]);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal}>
        <div className="modal">
          <h2 className="text-2xl font-bold text-blue-700">
            Search your saved items
          </h2>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="my-7 w-full outline-none border p-2 rounded focus:border-indigo-600 focus:shadow-md transition-all"
            placeholder="Filter with item's id or name"
          />
        </div>

        {!items?.length && search.length ? (
          <p className="text-center text-sm text-gray-500 font-light flex items-center justify-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span> "{search}" is not available right now</span>
          </p>
        ) : !search.length ? (
          <p className="text-center text-sm text-gray-500 font-light flex items-center justify-center space-x-3">
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
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Keep searching</span>
          </p>
        ) : (
          <>
            <SearchItems
              setOpen={setOpen}
              setItems={setItems}
              products={items}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default SearchProduct;
