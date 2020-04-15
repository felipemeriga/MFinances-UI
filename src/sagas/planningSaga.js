import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from "../actions/types";
import {api} from "../services";
import {SUCCESS_PLANNINGS} from "../actions/types";
import {ERROR_PLANNINGS} from "../actions/types";

export function* handleApiRequest2(action) {
    try {
        const request = yield api.callApi('');
        yield put({type: SUCCESS_PLANNINGS, payload: request});
    }
    catch (error) {
    yield put({type: ERROR_PLANNINGS, error})
    }
}

export function* handleApiRequest(action) {

    const currentTypes = (types[action.payload.type]);
    try {
        yield put({type: currentTypes[action.payload.method.toUpperCase()]});
        const request = yield api.callApi('');
        yield put({type: currentTypes[action.payload.method.toUpperCase() + '_SUCCESS'], payload: request});
    }
    catch (error) {
        yield put({type: action.payload.method.toUpperCase() + currentTypes['_ERROR'], error})
    }
}

export function* watchGetPlannings() {
    yield takeEvery(types.GET_PLANNINGS, handleApiRequest2);
}


export function* watchCallApi() {
    yield takeEvery(types.CALL_API, handleApiRequest);
}
