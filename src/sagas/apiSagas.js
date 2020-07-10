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

    // This is clause here is to handle planning and cash flow tables, because they are filtered depending a specific month
    if(payload.type === 'PLANNING_TABLE' || payload.type === 'CASH_FLOW_TABLE') {
        let formattedDate = typeState.selectedMonth.getFullYear() + "-" + (typeState.selectedMonth.getMonth() + 1) + "-" + typeState.selectedMonth.getDate();
        payload.selectedMonth = typeState.selectedMonth;
        payload.config.endpoint = payload.config.endpoint + "/monthly";
        payload.config.arguments = `size=${typeState.data.size}&page=${typeState.data.number}&date=${formattedDate}`;
    } else {
        payload.config.arguments = `size=${typeState.data.size}&page=${typeState.data.number}`;
    }
    yield put({type: types.CALL_API, payload: payload});
}

export function* handleApiRequest(action) {
    const currentTypes = (types[action.payload.type]);
    try {
        yield put({type: currentTypes[action.payload.method.toUpperCase()], payload: action.payload});
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

export function* handleGetAllWithFK(action) {
    const currentTypes = (types[action.payload.type]);
    const fkEndpoints = action.payload.fkEndpoints;
    // This object will be the final object delivered when all the apis are fetched, the main key of the object represents
    // the main content of the table, and the keys related to the ENDPOINTS are each fetched fk.
    const result = {};
    try {
        yield put({type: currentTypes[types.GET_ALL_WITH_FK], payload: action.payload.config.data});
        const request = yield api.callApi(action.payload);
        result['main'] = request;
        for(let i =0; i < fkEndpoints.length; i++) {
            action.payload.config.endpoint = ENDPOINTS[fkEndpoints[i]];
            const apiResult = yield api.callApi(action.payload);
            result[ENDPOINTS[fkEndpoints[i]]] =  apiResult.content;
        }
        yield put({type: currentTypes[types.GET_ALL_WITH_FK + '_SUCCESS'], payload: result});
    }
    catch (error) {
        yield put({type: currentTypes[types.GET_ALL_WITH_FK + '_ERROR'], payload: error.response.data});
    }
}

export function* watchCallApi() {
    yield takeEvery(types.CALL_API, handleApiRequest);
}

export function* watchGetAllWithFK() {
    yield takeEvery(types.GET_ALL_WITH_FK, handleGetAllWithFK);
}
