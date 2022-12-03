import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQ,
  CATEGORY_CREATE_SUCC,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQ,
  CATEGORY_DELETE_SUCC,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQ,
  CATEGORY_UPDATE_SUCC,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQ,
  GET_ALL_PRODUCTS_SUCC,
  PRODUCT_CAT_FAIL,
  PRODUCT_CAT_REQ,
  PRODUCT_CAT_SUCC,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQ,
  PRODUCT_CREATE_SUCC,
  PRODUCT_DEL_FAIL,
  PRODUCT_DEL_REQ,
  PRODUCT_DEL_SUCC,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQ,
  PRODUCT_EDIT_SUCC,
  PRODUCT_REV_REQ,
  PRODUCT_REV_SUCC,
  PRODUCT_VIEW_FAIL,
  PRODUCT_VIEW_REQ,
  PRODUCT_VIEW_SUCC,
} from "../constants/productConsts";

export const productReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQ:
      return {
        loading: true,
      };
    case GET_ALL_PRODUCTS_SUCC:
      return {
        products: action.payload,
      };
    case GET_ALL_PRODUCTS_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productViewReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_VIEW_REQ:
      return {
        loading: true,
      };
    case PRODUCT_VIEW_SUCC:
      return {
        product: action.payload,
        successes: true,
      };
    case PRODUCT_VIEW_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewsOfProduct = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_REV_REQ:
      return { loading: true };
    case PRODUCT_REV_SUCC:
      return { reviews: action.payload };
    case PRODUCT_VIEW_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productReviewsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "ADD_REV_REQ":
      return { loadingReviews: true };
    case "ADD_REV_SUCC":
      return {
        loadingReviews: false,
        successReviews: true,
      };
    case "ADD_REV_FAIL":
      return { loadingReviews: false, error: action.payload };
    default:
      return state;
  }
};

//  GET CATEGORIES

export const getCatsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CAT_REQ:
      return { loadingCats: true };
    case PRODUCT_CAT_SUCC:
      return { data: action.payload, success: true };
    case PRODUCT_CAT_FAIL:
      return { errorCats: action.payload };
    default:
      return state;
  }
};

// CREATE PRODUCT

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQ:
      return { loadingCreate: true };
    case PRODUCT_CREATE_SUCC:
      return { createdProduct: action.payload, createProductSuccess: true };
    case PRODUCT_CREATE_FAIL:
      return { error: action.payload };
    case "PRODUCT_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

// CREATE PRODUCT

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQ:
      return { updateLoading: true };
    case PRODUCT_EDIT_SUCC:
      return { updateProduct: action.payload, updateProductSuccess: true };
    case PRODUCT_EDIT_FAIL:
      return { error: action.payload };
    case "PRODUCT_EDIT_RESET":
      return {};
    default:
      return state;
  }
};

// DELETE PRODUCT

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DEL_REQ:
      return { deleteLoading: true };
    case PRODUCT_DEL_SUCC:
      return { successDelete: true };
    case PRODUCT_DEL_FAIL:
      return { error: action.payload };
    case "RESET_DELETE":
      return {};
    default:
      return state;
  }
};

// CREATE CATEGORY

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQ:
      return { loadingCreate: true };
    case CATEGORY_CREATE_SUCC:
      return { createdCategory: action.payload, success: true };
    case CATEGORY_CREATE_FAIL:
      return { error: action.payload };
    case "CATEGORY_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

// UPDATE CATEGORY

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQ:
      return { loading: true };
    case CATEGORY_UPDATE_SUCC:
      return { updatedCategory: action.payload, successUpdateCategory: true };
    case CATEGORY_UPDATE_FAIL:
      return { error: action.payload };
    case "CATEGORY_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

// DELETE CATEGORY

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQ:
      return { loading: true };
    case CATEGORY_DELETE_SUCC:
      return { deletedCategory: action.payload, successDeleteCategory: true };
    case CATEGORY_DELETE_FAIL:
      return { error: action.payload };
    case "CATEGORY_DELETE_RESET":
      return {};
    default:
      return state;
  }
};
