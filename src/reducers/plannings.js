import * as types from "../actions/types";


const initialState = {
    plannings: {},
    loading: false,
    error: null,
    message: null
};

export default function plannings(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_PLANNINGS:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.SUCCESS_PLANNINGS:
            return {
                ...state,
                loading: false,
                error: false
            };
        case types.ERROR_PLANNINGS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: true
            };
        default:
            return state;
    }
}
