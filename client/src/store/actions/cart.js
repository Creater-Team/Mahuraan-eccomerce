import { api } from "../../api";
import {
  ADD_CART_FAIL,
  ADD_CART_REQ,
  ADD_CART_SUCC,
  ADD_SHIPPING,
  ADD_TO_CART,
  DECREMENT_PRODUCT,
  DELETE_ITEM,
  GET_CART_FAIL,
  GET_CART_REQ,
  GET_CART_SUCC,
  REMOVE_SHIPPING,
} from "../constants/cart";

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};

export const decrementCart = (product) => (dispatch, getState) => {
  dispatch({
    type: DECREMENT_PRODUCT,
    payload: product,
  });
};

export const removeItem = (product) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ITEM,
    payload: product,
  });
};

// add shipping

export const addShippingInfo = (data) => (dispatch, getState) => {
  dispatch({
    type: ADD_SHIPPING,
    payload: data,
  });

  localStorage.setItem("shipping", JSON.stringify(getState().shippingInfo));
};

//remove shippping info
export const removeShippingInfo = () => (dispatch) => {
  dispatch({
    type: REMOVE_SHIPPING,
  });
  localStorage.removeItem("shipping");
};

// my cart

export const mycart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CART_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get("/cart/mycart", {
      headers: {
        Authorization: userInfo.token,
      },
    });
    if (data.success) {
      dispatch({
        type: GET_CART_SUCC,
        payload: data.myCart,
      });
      dispatch({
        type: "RESET_ADD",
      });
    } else {
      dispatch({
        type: GET_CART_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: "LOOKS LIKE SOMETHING IS WRONG." + error,
    });
  }
};

export const addToCartWithUser = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CART_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/cart/addtocart",
      { productId },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );
    if (data.success) {
      dispatch({
        type: ADD_CART_SUCC,
        payload: data,
      });
    } else {
      dispatch({
        type: ADD_CART_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_CART_FAIL,
      payload: "LOOKS LIKE SOMETHING IS WRONG." + error,
    });
  }
};

export const removeItemFromCart = (cartId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "REMOVE_ITEM",
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/cart/deleteitem",
      { cartId },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.delete) {
      dispatch({
        type: "REMOVE_ITEM_SUCC",
        payload: data,
      });
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateCartItem = (cartId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_ITEM",
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/cart/updateItem",
      { cartId },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.updated) {
      dispatch({
        type: "UPDATE_ITEM_SUCC",
        payload: data,
      });
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
