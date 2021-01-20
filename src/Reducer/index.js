import {combineReducers } from "redux";
import movieReducer from "./movie";


const rootReducer = combineReducers({
    movieReducer:movieReducer,
});

export default rootReducer;