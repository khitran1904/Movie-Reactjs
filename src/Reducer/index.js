import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
import theaterReducer from "./Theater";
import SignUpReducer from "./SignUp";
import BookingTicketsReducer from "./BookingTickets";

const rootReducer = combineReducers({
  movieReducer,
  authReducer,
  theaterReducer,
  SignUpReducer,
  BookingTicketsReducer,
});

export default rootReducer;
