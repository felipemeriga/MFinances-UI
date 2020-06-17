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
    alreadyExistingWithinMonth: {},
    categoryAlreadyExists: false,
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
                error: false,
                success: false,
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
                selectedMonth: action.payload.selectedMonth,
                loading: true,
                error: false,
                success: false,
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
        case types.PLANNING_TABLE['POST']:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                categoryAlreadyExists: false,
            };
        case types.PLANNING_TABLE['POST_SUCCESS']:
            return {
                ...state,
                loading: false,
                success: true,
                message: `Success creating planning with id: ${action.payload.id}`,
                error: true
            };
        case types.PLANNING_TABLE['POST_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.PLANNING_TABLE['PUT']:
            return {
                ...state,
                selected: action.payload.config.data,
                loading: true,
                error: false,
                success: false
            };
        case types.PLANNING_TABLE['PUT_SUCCESS']:
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                message: `Success saving Planning with id: ${action.payload.id}`,
            };
        case types.PLANNING_TABLE['PUT_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                success: false,
                message: action.payload.apierror.message
            };
        case types.PLANNING_TABLE['DELETE']:
            return {
                ...state,
                selected: action.payload.config.data,
                loading: true,
                success: false,
                error: false
            };
        case types.PLANNING_TABLE['DELETE_SUCCESS']:
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                message: 'Done in deleting item(s)'
            };
        case types.PLANNING_TABLE['DELETE_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH']:
            return {
                ...state,
                loading: true,
                categoryAlreadyExists: false,
                selected: action.payload.data,
                alreadyExistingWithinMonth: {}
            };
        case types.PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH_SUCCESS']:
            return {
                ...state,
                loading: false,
                categoryAlreadyExists: true,
                alreadyExistingWithinMonth: action.payload
            };
        case types.PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH_ERROR']:
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
