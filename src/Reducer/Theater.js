import {
  GET_THEATER_LIST_FAIL,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
  GET_THEATER_BRAND_FAILED,
  GET_THEATER_BRAND_REQUEST,
  GET_THEATER_BRAND_SUCCESS,
  RESET_THEATER_BRAND_LIST,
  GET_THEATER_ADDRESSES_SUCCESS,
  GET_THEATER_ADDRESSES_FAILED,
} from "../Constants/Theater";

const initialState = {
  theaterList: [],
  loading: false,
  error: null,
  listBrand: [],
  listAddresses: [],
};

const theaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEATER_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_THEATER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        theaterList: action.payload.data.heThongRapChieu,
      };
    case GET_THEATER_LIST_FAIL:
      return { ...state, error: action.payload.error };
    case GET_THEATER_BRAND_FAILED:
      return { ...state };
    case GET_THEATER_BRAND_REQUEST:
      return { ...state };
    case GET_THEATER_BRAND_SUCCESS:
      return { ...state, listBrand: [...state.listBrand, action.payload.data] };
    case RESET_THEATER_BRAND_LIST:
      return { ...state, listBrand: [] };

    case GET_THEATER_ADDRESSES_SUCCESS:
      return { ...state, listAddresses: action.payload.data };
    case GET_THEATER_ADDRESSES_FAILED:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
export default theaterReducer;
