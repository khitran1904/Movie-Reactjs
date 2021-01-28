import {GET_MOVIE_LIST_FAIL,
    GET_MOVIE_LIST_REQUEST,
    GET_MOVIE_LIST_SUCCESS,
    GET_MOVIE_DETAIL_FAILED,
    GET_MOVIE_DETAIL_REQUEST,
    GET_MOVIE_DETAIL_SUCCESS,
}
from '../Constants/Movie';


const initialState = {
    movieList: [],
    loading: false,
    error: null,
    movieDetail: {}
};
const movieReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_MOVIE_LIST_REQUEST:
            return {...state, loading:true};
        case GET_MOVIE_LIST_SUCCESS:
                return{...state, loading:false, movieList:action.payload.data};
        case GET_MOVIE_LIST_FAIL:
            return{...state, error:action.payload.error};
        
        case GET_MOVIE_DETAIL_REQUEST:
            return {...state, loading:true};
        case GET_MOVIE_DETAIL_SUCCESS:
            return {...state, loading:false, movieDetail: action.payload.data};
        case GET_MOVIE_DETAIL_FAILED:
            return {...state, error: action.payload.error};
        default:
            return state;
    }
};

export default movieReducer;