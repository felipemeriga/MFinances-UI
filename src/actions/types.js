// A simple GET request
import {func} from "prop-types";

const GET = 'GET';
// A simple DELETE request
const DELETE = 'DELETE';
// A simple PUT request
const PUT = 'PUT';
// A simple POST request
const POST = 'POST';
// Used for tables and forms that needs to fetch also all the available FKs, used for fetching the entity to persist
// it on a table/form and get all the FKs related to that entity
export const GET_ALL_WITH_FK = 'GET_ALL_WITH_FK';
// SUCCESS suffix for the types
const SUCCESS = 'SUCCESS';
// ERROR suffix for the types
const ERROR = 'ERROR';

function createRequestTypes(base, additional) {
    let options = [GET, DELETE, PUT, POST, GET_ALL_WITH_FK];
    if(additional) {
        options.push(...additional);
    }
    let obj = options.reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});

    Object.keys(obj).forEach(function(key) {
        obj[`${key}_${SUCCESS}`] = `${base}_${key}_${SUCCESS}`;
        obj[`${key}_${ERROR}`] = `${base}_${key}_${ERROR}`;
    });
    return obj;
}

function createCustomTypes(obj, base) {
    obj[base] = base;
    obj[`${base}_${SUCCESS}`] = `${base}_${SUCCESS}`;
    obj[`${base}_${ERROR}`] = `${base}_${ERROR}`;
}

/* This is a very important step of the application, each of the exported constants are called types, for example
we have the type USER, this type user is an object with the keys, GET, DELETE, POST, PUT, GET_SUCCESS, POST_SUCCESS,
PUT_SUCCESS, DELETE_SUCCESS, GET_ERROR, POST_ERROR, PUT_ERROR, DELETE_ERROR. Then for each of those keys, there are the
actions, those actions are build by createRequestTypes function, and some of them are used inside the respective reducer.
The point of doing that, is that Sagas will receive that types in a general abstract api function, which means that you
don't have to create actions functions for all those actions, just the constants. Also, you don't need to call them
from inside your components all and over again, Sagas will do that for you.
*/
export const USER = createRequestTypes('USER');
export const CATEGORY_TABLE = createRequestTypes('CATEGORY_TABLE');
export const PLANNING_TABLE = createRequestTypes('PLANNING_TABLE');
createCustomTypes(PLANNING_TABLE, 'VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH');
export const CASH_FLOW_TABLE = createRequestTypes('CASH_FLOW_TABLE');
export const HEADER_STATISTICS = createRequestTypes('HEADER_STATISTICS');
export const EXPENSE_STATISTICS = createRequestTypes('EXPENSE_STATISTICS');
export const AVERAGE_EXPENSES = createRequestTypes('AVERAGE_EXPENSES');

export const CALL_API = 'CALL_API';
// Those are the endpoints for each type, make sure that the key inside ENDPOINTS, matches with the type name.
export const ENDPOINTS = {
  USER: 'users',
    CATEGORY_TABLE: 'categories',
  CATEGORY: 'categories',
    PLANNING: 'plannings',
    PLANNING_TABLE: 'plannings',
    CASH_FLOW: 'cash-flow',
    CASH_FLOW_TABLE: 'cash-flow',
    HEADER_STATISTICS: 'statistics/percentages',
    EXPENSE_STATISTICS: 'statistics/expenses',
    AVERAGE_EXPENSES: 'statistics/last-months'
};
// Those are the selectors for Sagas to get the current state, make sure that the key inside SELECTORS, matches with the type name.
export const SELECTORS = {
    CATEGORY_TABLE: 'categoryTable',
    PLANNING_TABLE: 'planningTable',
    CASH_FLOW_TABLE: 'cashFlowTable'
};
