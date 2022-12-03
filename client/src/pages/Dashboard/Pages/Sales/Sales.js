import React from "react";

const Sales = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl text-center">SALES</h1>
      <input
        type="text"
        className="my-4 w-full border p-3 rounded shadow-sm outline-none"
        placeholder="BARCODE"
        autoFocus={true}
      />
    </div>
  );
};

export default Sales;
