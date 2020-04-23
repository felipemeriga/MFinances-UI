const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';
const POST = 'POST';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

function createRequestTypes(base, additional) {
    let options = [GET, DELETE, PUT, POST];
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
export const PLANNING_TABLE = createRequestTypes('PLANNING_TABLE',['FK_CATEGORY']);
export const CALL_API = 'CALL_API';
// Those are the endpoints for each type, make sure that the key inside ENDPOINTS, matches with the type name.
export const ENDPOINTS = {
  USER: 'users',
    CATEGORY_TABLE: 'categories',
  CATEGORY: 'categories',
    PLANNING_TABLE: 'plannings'
};
// Those are the selectors for Sagas to get the current state, make sure that the key inside SELECTORS, matches with the type name.
export const SELECTORS = {
    CATEGORY_TABLE: 'categoryTable'
};
