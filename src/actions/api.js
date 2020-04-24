import * as types from "./types";


export function callAPI(payload) {
    return {
        type: types.CALL_API,
        payload: payload
    };
}

export function getAllWithFK(payload) {
    return {
        type: types.GET_ALL_WITH_FK,
        payload: payload
    };

}
