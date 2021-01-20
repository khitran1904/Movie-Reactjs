import {GET_MOVIE_LIST_FAIL,GET_MOVIE_LIST_REQUEST,GET_MOVIE_LIST_SUCCESS} from '../Constants/Movie';


const initialState = {
    movieList: [],
    loading: false,
    error: ""
};
const movieReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_MOVIE_LIST_REQUEST:
            return {...state,loading:true};
        case GET_MOVIE_LIST_SUCCESS:
                return{...state,loading:false,movieList:action.payload.data};
        case GET_MOVIE_LIST_FAIL:
            return{...state,error:action.payload.error};
        
        default:
            return state;
    }
};

export default movieReducer;