import { GET_ACCOUNT_FAIL, GET_ACCOUNT_REQUEST, GET_ACCOUNT_SUCCESS,
    CHANGE_ACCOUNT_REQUEST,
    CHANGE_ACCOUNT_SUCCESS,
    CHANGE_ACCOUNT_FAIL } from "../Constants/Account";


let initialState = {
    currentUser: "",
    loading: false,
    error: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ACCOUNT_SUCCESS:
            return { ...state, loading: false, currentUser: action.payload.data };
        case GET_ACCOUNT_FAIL:
            return { ...state, error: action.payload.error, loading: false };
        case CHANGE_ACCOUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case CHANGE_ACCOUNT_SUCCESS:
            return { ...state, loading: false, currentUser: action.payload.data };
        case CHANGE_ACCOUNT_FAIL:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
};

export default accountReducer;
