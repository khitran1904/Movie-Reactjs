import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
import theaterReducer from "./Theater";
import SignUpReducer from "./SignUp";
import alertReducer from "./alert";
const rootReducer = combineReducers({
  movieReducer,
  authReducer,
  theaterReducer,
  SignUpReducer,
  alertReducer,
});

export default rootReducer;
