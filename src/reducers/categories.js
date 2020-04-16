import * as types from "../actions/types";


const initialState = {
    data: {},
    loading: false,
    error: null,
    message: null
};

export default function categories(state = initialState, action = {}) {
    switch (action.type) {
        case types.CATEGORY['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.CATEGORY['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.CATEGORY['GET_ERROR']:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}
