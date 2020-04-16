import * as types from "../actions/types";


const initialState = {
    data: {},
    loading: false,
    error: null,
    message: null
};

export default function plannings(state = initialState, action = {}) {
    switch (action.type) {
        case types.PLANNING['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.PLANNING['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.PLANNING['GET_ERROR']:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}