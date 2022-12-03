import { api } from "../../api";
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
  PLACE_ORDER_SUCC,
} from "../constants/orderConsts";

export const placeOrderAction = (info) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLACE_ORDER_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/orders/pay-order",
      {
        ...info,
      },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );
    if (data.success) {
      dispatch({
        type: PLACE_ORDER_SUCC,
        payload: data.newOrder,
      });
    } else {
      dispatch({
        type: PLACE_ORDER_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: "Looks like something is wrong" + error,
    });
  }
};

// GET ORDER

export const getOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get(`/orders/find-order/${id}`, {
      headers: {
        Authorization: userInfo.token,
      },
    });

    if (data.success) {
      dispatch({
        type: GET_ORDER_SUCC,
        payload: data.order,
      });
    } else {
      dispatch({
        type: GET_ORDER_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error,
    });
  }
};

// GET ALL ORDERS

export const fetchAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get("/orders/all", {
      headers: {
        Authorization: userInfo.token,
      },
    });

    if (data.success) {
      dispatch({
        type: GET_ALL_ORDERS_SUCC,
        payload: data.orders,
      });
    } else {
      dispatch({
        type: GET_ALL_ORDERS_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error,
    });
  }
};

// GET DELIVERED ORDERS

export const fetchDeliveredOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DELIVERED_ORDERS_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get(
      "/orders/find-delivered",

      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.success) {
      dispatch({
        type: GET_DELIVERED_ORDERS_SUCC,
        payload: data.orders,
      });
    } else {
      dispatch({
        type: GET_DELIVERED_ORDERS_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_DELIVERED_ORDERS_FAIL,
      payload: error,
    });
  }
};

// GET UNDELIVERED ORDERS

export const fetchUnDeliveredOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NOTDELIVERED_ORDERS_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get(
      "/orders/find-undelivered",

      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.success) {
      dispatch({
        type: GET_NOTDELIVERED_ORDERS_SUCC,
        payload: data.orders,
      });
    } else {
      dispatch({
        type: GET_NOTDELIVERED_ORDERS_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_NOTDELIVERED_ORDERS_FAIL,
      payload: error,
    });
  }
};

// GET UNDELIVERED ORDERS

export const orderByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_BY_ADMIN_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get(`/orders/admin/get-order/${id}`, {
      headers: {
        Authorization: userInfo.token,
      },
    });

    if (data.success) {
      dispatch({
        type: GET_ORDER_BY_ADMIN_SUCC,
        payload: data.order,
      });
    } else {
      dispatch({
        type: GET_ORDER_BY_ADMIN_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ADMIN_FAIL,
      payload: error,
    });
  }
};

// edit order ORDERS

export const editOrderByAdmin =
  (id, delivery, payment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_ORDER_BY_ADMIN_REQ,
      });

      const {
        user: { userInfo },
      } = getState();

      const { data } = await api.put(
        `/orders/admin/edit-order/${id}`,
        {
          delivery,
          payment,
        },
        {
          headers: {
            Authorization: userInfo.token,
          },
        }
      );

      if (data.success) {
        dispatch({
          type: EDIT_ORDER_BY_ADMIN_SUCC,
          payload: data.order,
        });
      } else {
        dispatch({
          type: EDIT_ORDER_BY_ADMIN_FAIL,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: EDIT_ORDER_BY_ADMIN_FAIL,
        payload: error,
      });
    }
  };
