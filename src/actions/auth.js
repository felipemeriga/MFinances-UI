import * as types from "./types";


export function createCognitoAuth() {
    return {
        type: types.CREATE_COGNITO_AUTH,
        payload: null
    }
}

export function login() {
    return {
        type: types.LOGIN,
        payload: null
    }
}
