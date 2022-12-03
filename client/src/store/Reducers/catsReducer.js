import { GET_CATS_FAIL, GET_CATS_REQ, GET_CATS_SUCC } from "../constants/cats";

export const getCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATS_REQ:
      return { loading: true };
    case GET_CATS_SUCC:
      return { cats: action.payload };
    case GET_CATS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
