import { combineReducers } from "redux";
import movieReducer from "./movie";

const rootReducer = combineReducers({
  movieReducer,
});

export default rootReducer;
