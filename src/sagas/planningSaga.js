import {takeEvery} from 'redux-saga/effects';
import * as types from "../actions/types";

export function* handleApiRequest(action) {
    console.log('Entered');
    debugger;


}

export function* watchGetPlannings() {
    yield takeEvery(types.GET_PLANNINGS, handleApiRequest);
}
