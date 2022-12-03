import {
  USER_AUTH_FAIL,
  USER_AUTH_REQ,
  USER_AUTH_SUCC,
  GET_USERS_REQ,
  GET_USERS_SUCC,
  GET_USERS_FAIL,
  EDIT_USER_REQ,
  EDIT_USER_SUCC,
  EDIT_USER_FAIL,
} from "../constants/userConsts";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTH_REQ:
      return { loading: true };
    case USER_AUTH_SUCC:
      return { userInfo: action.payload };
    case USER_AUTH_FAIL:
      return { error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

// ALL USERS

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQ:
      return { loading: true };
    case GET_USERS_SUCC:
      return { users: action.payload, success: true };
    case GET_USERS_FAIL:
      return { success: false, error: action.payload };
    default:
      return state;
  }
};

// EDIT USERS

export const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER_REQ:
      return { loading: true };
    case EDIT_USER_SUCC:
      return { updatedUser: action.payload, success: true };
    case EDIT_USER_FAIL:
      return { success: false, error: action.payload };
    case "RESET_UPDATE":
      return {};
    default:
      return state;
  }
};
