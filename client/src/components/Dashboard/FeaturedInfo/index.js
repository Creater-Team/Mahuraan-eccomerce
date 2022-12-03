import React from "react";

const FeaturedInfo = ({ svg, text, count }) => {
  return (
    <div className="flex items-center shadow-md bg-white p-4 my-3 rounded justify-between">
      <div>
        <p className="text-xl font-bold text-slate-600 my-3">{count}</p>
        <h1 className="text-sm  uppercase font-light">{text}</h1>
      </div>
      <span className="bg-slate-800 text-white p-2 rounded-full">{svg}</span>
    </div>
  );
};

export default FeaturedInfo;
