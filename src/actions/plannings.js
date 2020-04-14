import * as types from "./types";


export function getPlannings() {
    return {
        type: types.GET_PLANNINGS
    }
}

export function planningRequestSuccess(payload) {
    return {
        type: types.SUCCESS_PLANNINGS,
        payload: payload
    }
}

export function planningRequestError(payload) {
    return {
        type: types.ERROR_PLANNINGS,
        payload: payload
    }
}
