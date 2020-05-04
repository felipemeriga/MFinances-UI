import * as types from "../actions/types";
import moment from "moment";


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
    selectedMonth: new Date(moment()),
    selected: {},
    categoriesFk: [],
    loading: false,
    error: false,
    message: ""
};

export default function planningTable(state = initialState, action = {}) {
    switch (action.type) {
        case types.PLANNING_TABLE['GET_ALL_WITH_FK']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.PLANNING_TABLE['GET_ALL_WITH_FK_SUCCESS']:
            return {
                ...state,
                data: action.payload.main,
                categoriesFk: action.payload.categories,
                loading: false,
                error: false
            };
        case types.PLANNING_TABLE['GET_ALL_WITH_FK_ERROR']:
            return {
                ...state,
                data: initialState.data,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
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
        case types.PLANNING_TABLE['PUT']:
            return {
                ...state,
                selected: action.payload,
                loading: true,
                error: false
            };
        case types.PLANNING_TABLE['PUT_SUCCESS']:
            const elementsIndex = state.data.content.findIndex(element => element.id === action.payload.id);
            state.data.content[elementsIndex] = action.payload;
            return {
                ...state,
                loading: false,
                error: true
            };
        case types.PLANNING_TABLE['PUT_ERROR']:
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
