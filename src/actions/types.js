export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const LOGIN = 'LOGIN';
export const SIGN_OUT = 'SIGN_OUT';
export const CREATE_COGNITO_AUTH = 'CREATE_COGNITO_AUTH';
export const PARSE_COGNITO_WEB_RESPONSE = 'PARSE_COGNITO_WEB_RESPONSE';
export const GET_SESSION = 'GET_SESSION';
export const GET_PLANNINGS = 'GET_PLANNINGS';
export const SUCCESS_PLANNINGS = 'SUCCESS_PLANNINGS';
export const ERROR_PLANNINGS = 'ERROR_PLANNINGS';
export const CALL_API = 'CALL_API';


const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';
const POST = 'POST';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

function createRequestTypes(base) {
    let obj = [GET, DELETE, PUT, POST].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc
    }, {});

    Object.keys(obj).forEach(function(key) {
        obj[`${key}_${SUCCESS}`] = `${base}_${key}_${SUCCESS}`;
        obj[`${key}_${ERROR}`] = `${base}_${key}_${ERROR}`;
    });
    return obj;
}

export const USER = createRequestTypes('USER');
