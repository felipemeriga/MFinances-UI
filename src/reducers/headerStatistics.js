import * as types from "../actions/types";


const initialState = {
    data: [],
    loading: true,
    error: false,
};

export default function headerStatistics(state = initialState, action = {}) {
    switch (action.type) {
        case types.HEADER_STATISTICS['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.HEADER_STATISTICS['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.HEADER_STATISTICS['GET_ERROR']:
            return {
                ...state,
                data: initialState.data,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        default:
            return state;

    }

}
