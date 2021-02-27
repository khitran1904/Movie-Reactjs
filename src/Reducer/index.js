import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
import theaterReducer from "./Theater";
import SignUpReducer from "./SignUp";
const rootReducer = combineReducers({
  movieReducer,
  authReducer,
  theaterReducer,
  SignUpReducer,
});

export default rootReducer;
