import React from "react";
import Load from "./Load";

const Loading = ({ size }) => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <i className="rotate text-slate-800 fa-solid fa-spinner"></i>
      </div>
    </div>
  );
};

export default Loading;
