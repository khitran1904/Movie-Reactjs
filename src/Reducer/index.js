import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
import theaterReducer from "./Theater";


const rootReducer = combineReducers({
  movieReducer,
  authReducer,
  theaterReducer,
});

export default rootReducer;
