import {
  EDIT_ORDER_BY_ADMIN_FAIL,
  EDIT_ORDER_BY_ADMIN_REQ,
  EDIT_ORDER_BY_ADMIN_SUCC,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_REQ,
  GET_ALL_ORDERS_SUCC,
  GET_DELIVERED_ORDERS_FAIL,
  GET_DELIVERED_ORDERS_REQ,
  GET_DELIVERED_ORDERS_SUCC,
  GET_NOTDELIVERED_ORDERS_FAIL,
  GET_NOTDELIVERED_ORDERS_REQ,
  GET_NOTDELIVERED_ORDERS_SUCC,
  GET_ORDER_BY_ADMIN_FAIL,
  GET_ORDER_BY_ADMIN_REQ,
  GET_ORDER_BY_ADMIN_SUCC,
  GET_ORDER_FAIL,
  GET_ORDER_REQ,
  GET_ORDER_SUCC,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQ,
  PLACE_ORDER_RESET,
  PLACE_ORDER_SUCC,
} from "../constants/orderConsts";

// PLACE ORDER

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQ:
      return { placeOrderLoading: true };
    case PLACE_ORDER_SUCC:
      return { order: action.payload, success: true };
    case PLACE_ORDER_FAIL:
      return { success: false, error: action.payload };
    case PLACE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

// GET ORDER

export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_REQ:
      return { loading: true };
    case GET_ORDER_SUCC:
      return { order: action.payload, success: true };
    case GET_ORDER_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// ALL ORDERS

export const getAllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQ:
      return { loadingOrders: true };
    case GET_ALL_ORDERS_SUCC:
      return { allOrders: action.payload };
    case GET_ALL_ORDERS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const deliveredOrders = (state = {}, action) => {
  switch (action.type) {
    case GET_DELIVERED_ORDERS_REQ:
      return { loading: true };
    case GET_DELIVERED_ORDERS_SUCC:
      return { deliveredOrders: action.payload, successDel: true };
    case GET_DELIVERED_ORDERS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const UndeliveredOrders = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTDELIVERED_ORDERS_REQ:
      return { loading: true };
    case GET_NOTDELIVERED_ORDERS_SUCC:
      return { undeliveredOrders: action.payload, successDel: true };
    case GET_NOTDELIVERED_ORDERS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// get order
// only admin

export const getOrderByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ADMIN_REQ:
      return { loading: true };
    case GET_ORDER_BY_ADMIN_SUCC:
      return { order: action.payload, success: true };
    case GET_ORDER_BY_ADMIN_FAIL:
      return { error: action.payload, success: false };
    default:
      return state;
  }
};
// get order
// only admin

export const editOrderByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ORDER_BY_ADMIN_REQ:
      return { editLoading: true };
    case EDIT_ORDER_BY_ADMIN_SUCC:
      return { orderUpdated: true, success: true };
    case EDIT_ORDER_BY_ADMIN_FAIL:
      return { error: action.payload, success: false };
    case "RESET_ORDER_UPDATE":
      return {};
    default:
      return state;
  }
};
