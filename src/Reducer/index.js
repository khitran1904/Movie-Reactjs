import { combineReducers } from "redux";
import movieReducer from "./movie";
import authReducer from "./Auth";
import theaterReducer from "./Theater";
import SignUpReducer from "./SignUp";
import BookingTicketsReducer from "./BookingTickets";
import ListSeatReducer from "./ListSeat";
import accountReducer from "./Account";

const rootReducer = combineReducers({
  movieReducer,
  authReducer,
  theaterReducer,
  SignUpReducer,
  BookingTicketsReducer,
  ListSeatReducer,
  accountReducer
});

export default rootReducer;
