import {
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_RESET,
} from "../Constants/SignUp";

let initialState = {
  userSignUp: "",
  loadingSignUp: false,
  errorSignUp: "",
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
        errorSignUp: "",
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        userSignUp: "",
        errorSignUp: action.payload.error,
        loadingSignUp: false,
      };
    case SIGN_UP_RESET:
      return { ...state, errorSignUp: "" };
    default:
      return state;
  }
};

export default SignUpReducer;
