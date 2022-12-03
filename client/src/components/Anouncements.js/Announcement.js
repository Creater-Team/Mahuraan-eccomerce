import React, { useState } from "react";

const Announcement = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <>
          <div className="bg-slate-900 shadow-sm w-full flex items-center justify-center p-2">
            <div className="text-cyan-200">
              <h1>FREE DELIVERY ON ORDERS OVER $200</h1>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-white text-2xl absolute top-0 right-3"
            >
              &times;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Announcement;
