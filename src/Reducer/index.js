import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
const rootReducer = combineReducers({
  movieReducer,
  authReducer,
});

export default rootReducer;
