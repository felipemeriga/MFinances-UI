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
    error: null,
    message: ""
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
                data: initialState.data,
                loading: false,
                error: true
            };
        case types.CATEGORY['PUT']:
            return {
                ...state,
                selected: action.payload,
                loading: true,
                error: false
            };
        case types.CATEGORY['PUT_SUCCESS']:
            const elementsIndex = state.data.content.findIndex(element => element.id === action.payload.id);
            state.data.content[elementsIndex] = action.payload;
            return {
                ...state,
                loading: false,
                error: true
            };
        case types.CATEGORY['PUT_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        default:
            return state;
    }
}
