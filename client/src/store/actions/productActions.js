import { api } from "../../api";
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

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PRODUCTS_REQ,
    });
    const { data } = await api.get("/products/all");
    if (data && data.success) {
      dispatch({
        type: GET_ALL_PRODUCTS_SUCC,
        payload: data.allProducts,
      });
    } else {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error,
    });
  }
};

export const productView = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_VIEW_REQ,
    });
    const { data } = await api.get(`/products/${id}`);
    if (data && data.success) {
      dispatch({
        type: PRODUCT_VIEW_SUCC,
        payload: data,
      });
    } else {
      dispatch({
        type: PRODUCT_VIEW_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_VIEW_FAIL,
      payload: error,
    });
  }
};

export const productRev = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REV_REQ,
    });
    const { data } = await api.get(`/products/reviews/${id}`);
    if (data.success) {
      dispatch({
        type: PRODUCT_REV_SUCC,
        payload: data.allReviews,
      });
    } else {
      dispatch({
        type: PRODUCT_REV_SUCC,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_REV_SUCC,
      payload: error,
    });
  }
};

// ADD REVIEW

export const createRev = (id, rating, body) => async (dispatch, getState) => {
  dispatch({
    type: "ADD_REV_REQ",
  });

  const {
    user: { userInfo },
  } = getState();

  const { data } = await api.post(
    "/users/addreview",
    {
      productId: id,
      rating: rating,
      body: body,
    },
    {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    }
  );

  if (data && data.success) {
    dispatch({
      type: "ADD_REV_SUCC",
    });
  } else {
    dispatch({
      type: "ADD_REV_FAIL",
      payload: data,
    });
  }
};

// GET CATEGORIES

export const getCats = (id, rating, body) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CAT_REQ,
  });

  const {
    user: { userInfo },
  } = getState();

  const { data } = await api.get("/products/admin/cats", {
    headers: {
      Authorization: `${userInfo.token}`,
    },
  });

  if (data && data.success) {
    dispatch({
      type: PRODUCT_CAT_SUCC,
      payload: data.categories,
    });
  } else {
    dispatch({
      type: PRODUCT_CAT_FAIL,
      payload: data,
    });
  }
};

// CREATE PRODUCT

export const createProduct = (file, body) => async (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append("inStock", body.inStock);
    formData.append("categoryId", body.categoryId);
    formData.append("price", body.price);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("image", file);
    dispatch({
      type: PRODUCT_CREATE_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(`/products/admin/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userInfo.token,
      },
    });

    if (data.errors) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: data.errors.msg,
      });
    } else {
      dispatch({
        type: PRODUCT_CREATE_SUCC,
        payload: data.product,
      });
    }
  } catch (error) {}
};

//  update product

export const updateProduct =
  (productId, file, body) => async (dispatch, getState) => {
    try {
      const formData = new FormData();
      formData.append("inStock", body.inStock);
      formData.append("price", body.price);
      formData.append("title", body.title);
      formData.append("description", body.description);
      formData.append("image", file);
      dispatch({
        type: PRODUCT_EDIT_REQ,
      });

      const {
        user: { userInfo },
      } = getState();

      const { data } = await api.put(
        `/products/admin/edit/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: userInfo.token,
          },
        }
      );

      if (!data.success) {
        dispatch({
          type: PRODUCT_EDIT_FAIL,
          payload: data.errors.msg,
        });
      } else {
        dispatch({
          type: PRODUCT_EDIT_SUCC,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_EDIT_FAIL,
        payload: error,
      });
    }
  };

// DELETE PRODUCT

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DEL_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/products/admin/delete",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.success) {
      dispatch({
        type: PRODUCT_DEL_SUCC,
      });
    } else {
      dispatch({
        type: PRODUCT_DEL_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DEL_FAIL,
      payload: error,
    });
  }
};

// CREATE CATEGORY

export const createCategoryAction =
  (type, img) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_CREATE_REQ,
      });

      const {
        user: { userInfo },
      } = getState();

      const { data } = await api.post(
        "/cat/create",
        {
          type,
          img,
        },
        {
          headers: {
            Authorization: userInfo.token,
          },
        }
      );

      if (data.success) {
        dispatch({
          type: CATEGORY_CREATE_SUCC,
          payload: data.category,
        });
      } else {
        dispatch({
          type: CATEGORY_CREATE_FAIL,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload: error,
      });
    }
  };

// UPDATE CATEGORY

export const updateCategoryAction =
  (type, img, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQ,
      });

      const {
        user: { userInfo },
      } = getState();

      const { data } = await api.put(
        "/cat/edit",
        {
          type,
          img,
          id,
        },
        {
          headers: {
            Authorization: userInfo.token,
          },
        }
      );

      if (data.success) {
        dispatch({
          type: CATEGORY_UPDATE_SUCC,
          payload: data.category,
        });
      } else {
        dispatch({
          type: CATEGORY_UPDATE_FAIL,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: error,
      });
    }
  };

// DELETE CATEGORY

export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQ,
    });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.post(
      "/cat/delete",
      {
        id,
      },
      {
        headers: {
          Authorization: userInfo.token,
        },
      }
    );

    if (data.success) {
      dispatch({
        type: CATEGORY_DELETE_SUCC,
        payload: data.category,
      });
    } else {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error,
    });
  }
};
