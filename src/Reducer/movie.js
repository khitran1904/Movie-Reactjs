/* eslint-disable no-unreachable */
import {
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_UPCOMING_REQUEST,
  GET_MOVIE_LIST_UPCOMING_SUCCESS,
  GET_MOVIE_LIST_UPCOMING_FAIL,
  GET_MOVIE_DETAIL_FAILED,
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_SCHEDULE_SUCCESS,
  GET_MOVIE_DETAIL_SCHEDULE_FAILED,
  RESET_MOVIE_DETAIL_SCHEDULE,
} from "../Constants/Movie";

const initialState = {
  movieList: [],
  movieListUpcoming: [],
  loading: false,
  error: null,
  movieDetail: {},
  movieSchedule: {},
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_LIST_SUCCESS:
      return { ...state, loading: false, movieList: action.payload.data };
    case GET_MOVIE_LIST_FAIL:
      return { ...state, error: action.payload.error };

    case GET_MOVIE_LIST_UPCOMING_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_LIST_UPCOMING_SUCCESS:
      return {
        ...state,
        loading: false,
        movieListUpcoming: action.payload.data,
      };
    case GET_MOVIE_LIST_UPCOMING_FAIL:
      return { ...state, error: action.payload.error };

    case GET_MOVIE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, loading: false, movieDetail: action.payload.data };
    case GET_MOVIE_DETAIL_FAILED:
      return { ...state, error: action.payload.error };
    case GET_MOVIE_DETAIL_SCHEDULE_SUCCESS:
      return { ...state, movieSchedule: action.payload.data };
    case GET_MOVIE_DETAIL_SCHEDULE_FAILED:
      return { ...state, error: action.payload.error };
    case RESET_MOVIE_DETAIL_SCHEDULE:
      return { ...state, movieSchedule: {} };
    default:
      return state;
  }
};

export default movieReducer;
