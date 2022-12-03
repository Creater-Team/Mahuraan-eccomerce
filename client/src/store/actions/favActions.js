import { ADD_TO_FAV, REMOVE_FAV } from "../constants/favoriteConsts";

export const addToFav = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_FAV,
    payload: product,
  });
};

export const removeFav = (product) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FAV,
    payload: product,
  });
};
