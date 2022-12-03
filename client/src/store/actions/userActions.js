import { api } from "../../api";
import {
  EDIT_USER_FAIL,
  EDIT_USER_REQ,
  EDIT_USER_SUCC,
  GET_USERS_FAIL,
  GET_USERS_REQ,
  GET_USERS_SUCC,
  USER_AUTH_REQ,
  USER_AUTH_SUCC,
} from "../constants/userConsts";

export const login = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_AUTH_REQ,
    });
    const { data } = await api.post("/users/login", {
      email: user.email,
      password: user.password,
      photo: user.img,
      username: user.username,
    });

    if (data && data.userId) {
      dispatch({
        type: USER_AUTH_SUCC,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({
        type: USER_AUTH_SUCC,
        paylod: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_AUTH_SUCC,
      paylod: error,
    });
  }
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });
  localStorage.removeItem("userInfo");
};

// all users

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USERS_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.get("/users/all", {
      headers: {
        Authorization: userInfo.token,
      },
    });

    if (data.success) {
      dispatch({
        type: GET_USERS_SUCC,
        payload: data.users,
      });
    } else {
      dispatch({
        type: GET_USERS_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error,
    });
  }
};
//  EDIT USER

export const editUserAction = (info) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_USER_REQ,
    });
    const {
      user: { userInfo },
    } = getState();

    const { data } = await api.put(
      "/users/edit",
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
        type: EDIT_USER_SUCC,
        payload: data.user,
      });
    } else {
      dispatch({
        type: EDIT_USER_FAIL,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error,
    });
  }
};
