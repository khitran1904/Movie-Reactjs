import {
  GET_THEATER_LIST_FAIL,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
} from "../Constants/Theater";

const initialState = {
  theaterList: [],
  loading: false,
  error: null,
};

const theaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEATER_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_THEATER_LIST_SUCCESS:
      return { ...state, loading: false, theaterList: action.payload.data };
    case GET_THEATER_LIST_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
export default theaterReducer;
