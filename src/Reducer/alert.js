import {  ALERT_FAILED, ALERT_SUCCESS } from "../Constants/Alert";

let initialState = {
  message: "",
};

let alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      console.log(action);
      return { ...state };
    case ALERT_FAILED:
      return { ...state };
    default:
      return { ...state };
  }
};

export default alertReducer;
