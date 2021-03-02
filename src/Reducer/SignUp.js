import {
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ALERT_RESET,
} from "../Constants/SignUp";

const userSignUp = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

let initialState = {
  userSignUp,
  loadingSignUp: false,
  errorSignUp: null,
  successMessage: "",
};

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, loadingSignUp: true };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loadingSignUp: false,
        userSignUp: action.payload.data,
        errorSignUp: null,
        successMessage: "Dang ki thanh cong",
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        userSignUp: "",
        errorSignUp: action.payload.error,
        loadingSignUp: false,
      };
    case SIGN_UP_ALERT_RESET:
      return { ...state, errorSignUp: "", successMessage: "" };
    default:
      return state;
  }
};

export default SignUpReducer;
