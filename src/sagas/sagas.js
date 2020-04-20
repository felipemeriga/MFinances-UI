import {takeEvery, call, put} from 'redux-saga/effects';
import * as types from "../actions/types";
import {api} from "../services";

export function* handleApiRequest(action) {

    const currentTypes = (types[action.payload.type]);
    try {
        yield put({type: currentTypes[action.payload.method.toUpperCase()]});
        const request = yield api.callApi(action.payload);
        yield put({type: currentTypes[action.payload.method.toUpperCase() + '_SUCCESS'], payload: request});
    }
    catch (error) {
        debugger;
        yield put({type: currentTypes[action.payload.method.toUpperCase() + '_ERROR'], error});
    }
}

export function* watchCallApi() {
    yield takeEvery(types.CALL_API, handleApiRequest);
}
