import { ADD_TO_FAV, REMOVE_FAV } from "../constants/favoriteConsts";

export const favReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAV: {
      return {
        ...state,
        favorites: state.favorites.filter(
          (x) => x.productId !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};
