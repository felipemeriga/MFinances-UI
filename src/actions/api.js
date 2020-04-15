import * as types from "./types";


export function callAPI(payload) {
    return {
        type: types.CALL_API,
        payload: payload
    }
}
