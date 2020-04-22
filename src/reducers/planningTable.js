import * as types from "../actions/types";


const initialState = {
    data: {
        content: [],
        pageable: {},
        totalElements: 0,
        last: false,
        totalPages: 1,
        size: 5,
        number: 0,
        first: true,
        sort: {},
        numberOfElements: 0,
        empty: false
    },
    selected: {},
    loading: false,
    error: false,
    message: ""
};

export default function planningTable(state = initialState, action = {}) {
    switch (action.type) {
        case types.PLANNING_TABLE['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.PLANNING_TABLE['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.PLANNING_TABLE['GET_ERROR']:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}
