
export const LOGIN = 'LOGIN';
export const SIGN_OUT = 'SIGN_OUT';
export const CREATE_COGNITO_AUTH = 'CREATE_COGNITO_AUTH';
export const PARSE_COGNITO_WEB_RESPONSE = 'PARSE_COGNITO_WEB_RESPONSE';
export const GET_SESSION = 'GET_SESSION';
export const CALL_API = 'CALL_API';


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

export const USER = createRequestTypes('USER');
export const CATEGORY_TABLE = createRequestTypes('CATEGORY_TABLE');
export const PLANNING_TABLE = createRequestTypes('PLANNING_TABLE',['FK_CATEGORY']);
export const ENDPOINTS = {
  USER: 'users',
    CATEGORY_TABLE: 'categories',
  CATEGORY: 'categories',
    PLANNING_TABLE: 'plannings'
};

