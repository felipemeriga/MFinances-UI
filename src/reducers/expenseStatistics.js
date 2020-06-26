import * as types from "../actions/types";


const initialState = {
    data: [],
    loading: false,
    error: false,
};

export default function expenseStatistics(state = initialState, action = {}) {
    switch (action.type) {
        case types.EXPENSE_STATISTICS['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.EXPENSE_STATISTICS['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.EXPENSE_STATISTICS['GET_ERROR']:
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
