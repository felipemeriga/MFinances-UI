import * as types from "./types";


export function initSessionFromCallbackURI(payload) {
    return {
        type: types.PROCESS_SESSION,
        payload: payload
    };
}

export function setSession(payload) {
    return {
        type: types.SET_SESSION,
        payload: payload
    };
}
