import {
  AUTH_LOGIN_REQ,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
} from "../Constants/Auth";

const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

let initialState = {
  currentUser,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQ:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload.data };
    case AUTH_LOGIN_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    default:
      return state;
  }
};

export default authReducer;
