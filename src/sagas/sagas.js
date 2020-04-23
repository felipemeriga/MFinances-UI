import {takeEvery, select, put, take, call} from 'redux-saga/effects';
import * as types from "../actions/types";
import {SELECTORS} from "../actions/types";
import {api} from "../services";
import {ENDPOINTS} from "../actions/types";



const getSelectors = (state, type) => state[SELECTORS[type]];

// This is the reFetch function, it's meant to be used when you delete/create item(s) from a table, so you need to
// fetch the data again from the database with a GET request
export function* reFetch(payload) {
    const typeState = yield select(getSelectors, payload.type);
    payload.method = 'get';
    payload.config.reFetch = false;
    payload.config.endpoint = ENDPOINTS[payload.type];
    payload.config.arguments = `size=${typeState.data.size}&page=${typeState.data.number}`;
    yield put({type: types.CALL_API, payload: payload});
}

export function* handleApiRequest(action) {

    const currentTypes = (types[action.payload.type]);
    try {
        yield put({type: currentTypes[action.payload.method.toUpperCase()], payload: action.payload.config.data});
        const request = yield api.callApi(action.payload);
        yield put({type: currentTypes[action.payload.method.toUpperCase() + '_SUCCESS'], payload: request});

        if(action.payload.config.reFetch) {
            yield call(reFetch,action.payload);
        }
    }
    catch (error) {
        yield put({type: currentTypes[action.payload.method.toUpperCase() + '_ERROR'], payload: error.response.data});
    }
}

export function* watchCallApi() {
    yield takeEvery(types.CALL_API, handleApiRequest);
}
