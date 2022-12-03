import React from "react";
import { Link } from "react-router-dom";

const Headers = ({ title, to }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center text-gray-500">
        <Link to={to}>More</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Headers;
