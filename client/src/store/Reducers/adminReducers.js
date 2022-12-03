// get featured info

import {
  GET_ADMIN_CHART_FAIL,
  GET_ADMIN_CHART_REQ,
  GET_ADMIN_CHART_SUCC,
  GET_ADMIN_INFO_FAIL,
  GET_ADMIN_INFO_REQ,
  GET_ADMIN_INFO_SUCC,
} from "../constants/DashboardConsts";

export const featuredInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_INFO_REQ:
      return { loading: true };
    case GET_ADMIN_INFO_SUCC:
      return { data: action.payload, success: true };
    case GET_ADMIN_INFO_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const chartInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_CHART_REQ:
      return { loadingChart: true };
    case GET_ADMIN_CHART_SUCC:
      return { data: action.payload, successChart: true };
    case GET_ADMIN_CHART_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// admin view

export const adminViewReducer = (state = { admin: false }, action) => {
  switch (action.type) {
    case "IS_ADMIN":
      return { admin: true };
    case "IS_NOT_ADMIN":
      return { admin: false };
    default:
      return state;
  }
};

// admin order toggle

export const deliveryToggle = (state = {}, action) => {
  switch (action.type) {
    case "DELIVERED":
      return { delivered: true };
    case "NOT_DELIVERED":
      return { delivered: false };
    case "ALL":
      return { all: true };
    default:
      return state;
  }
};
