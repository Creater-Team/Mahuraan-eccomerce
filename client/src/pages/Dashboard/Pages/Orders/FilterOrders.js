import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FilterOrders = () => {
  const [filter, setFilter] = useState(true);
  const navigate = useNavigate();

  const { delivered, all } = useSelector((state) => state.toggleDelivery);
  const [del, setDel] = useState(false);
  const [allOrders, setAllOrders] = useState(true);
  const [undel, setUnDel] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (delivered) {
      setDel(true);
      setUnDel(false);
      setAllOrders(false);
      navigate("/admin/orders/delivered");
    } else if (!delivered && !all) {
      setDel(false);
      setUnDel(true);
      setAllOrders(false);
      navigate("/admin/orders/not-delivered");
    }
    if (all) {
      setDel(false);
      setUnDel(false);
      setAllOrders(true);
      navigate("/admin/orders");
    }
  }, [delivered, all]);

  const handleDelivered = () => {
    if (del) {
      dispatch({
        type: "ALL",
      });
    } else {
      dispatch({
        type: "DELIVERED",
      });
    }
  };

  const handleUnDelivered = () => {
    if (!undel) {
      dispatch({
        type: "NOT_DELIVERED",
      });
    } else {
      dispatch({
        type: "ALL",
      });
    }
  };

  const handleAll = () => {
    dispatch({
      type: "ALL",
    });
  };

  return (
    <div>
      <h1>Filter </h1>
      <div className="flex items-center space-x-3 p-3">
        <input
          id="checkbox-all"
          type="checkbox"
          checked={allOrders}
          onChange={() => handleAll()}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checkbox-all">All</label>
        <input
          id="checkbox-del"
          type="checkbox"
          checked={del}
          onChange={() => handleDelivered()}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checkbox-del">Delivered</label>
        <input
          id="checkbox-un"
          type="checkbox"
          checked={undel}
          onChange={() => handleUnDelivered()}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checkbox-un">Not delivered</label>
      </div>
      <hr />
    </div>
  );
};

export default FilterOrders;
