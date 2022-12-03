import React from "react";
import { Link, NavLink } from "react-router-dom";

const Button = (props) => {
  return (
    <div className="mx-4">
      <div {...props} className=" mb-3 w-64 mx-auto rounded transition-all">
        <NavLink
          to={props.to}
          className="flex hover:bg-gray-200 rounded p-1 justify-start text-black items-center text-sm space-x-4 ml-5"
        >
          <p> {props.icon}</p>
          <p>{props.text}</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Button;
