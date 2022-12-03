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

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { payload } = action;
      const existingItem = state.cartItems.find(
        (product) => product.productId === payload.productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === payload.productId
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    case DECREMENT_PRODUCT:
      const decrementingItem = state.cartItems.find(
        (pro) => pro.productId === action.payload
      );
      if (decrementingItem && decrementingItem.qty !== 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((pro) =>
            pro.productId === action.payload
              ? { ...pro, qty: pro.qty - 1 }
              : pro
          ),
        };
      }

    case DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.productId !== action.payload
        ),
      };

    default:
      return state;
  }
};

//  shipping info

export const shippingInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHIPPING:
      return { shippingInfo: action.payload, success: true };
    case REMOVE_SHIPPING:
      return {};
    default:
      return state;
  }
};

export const myCartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_REQ:
      return { loadingCart: true };
    case GET_CART_SUCC:
      return { successCart: true, data: action.payload };
    case GET_CART_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
export const addToMyCart = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_REQ:
      return { loading: true, loadingAddToCart: true };
    case ADD_CART_SUCC:
      return { successAddToCart: true, data: action.payload, refresh: true };
    case "RESET_ADD":
      return { ...state, refresh: false };
    case ADD_CART_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const removeCart = (state = {}, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return { loading: true };
    case "REMOVE_ITEM_SUCC":
      return { removeSuccess: true };
    default:
      return state;
  }
};

export const updateCartItem = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      return { loading: true };
    case "UPDATE_ITEM_SUCC":
      return { updateSuccess: true };
    default:
      return state;
  }
};
