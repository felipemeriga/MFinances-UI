import moment from "moment";
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
    selectedMonth: new Date(moment()),
    selected: {},
    categoriesFk: [],
    loading: false,
    error: false,
    message: ""
};

export default function cashFlowTable(state = initialState, action = {}) {
    switch (action.type) {
        case types.CASH_FLOW_TABLE['GET_ALL_WITH_FK']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.CASH_FLOW_TABLE['GET_ALL_WITH_FK_SUCCESS']:
            return {
                ...state,
                data: action.payload.main,
                categoriesFk: action.payload.categories,
                loading: false,
                error: false
            };
        case types.CASH_FLOW_TABLE['GET_ALL_WITH_FK_ERROR']:
            return {
                ...state,
                data: initialState.data,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.CASH_FLOW_TABLE['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.CASH_FLOW_TABLE['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.CASH_FLOW_TABLE['GET_ERROR']:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;

    }

}
