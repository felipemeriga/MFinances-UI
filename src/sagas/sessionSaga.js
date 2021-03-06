import {put, takeEvery} from "@redux-saga/core/effects";
import * as types from "../actions/types";
import cognitoUtils from "../auth/cognitoUtils";

export function* initSessionFromCallbackURI(action) {
    try {
        const callbackHref = action.payload.callbackHref;
        const request = yield cognitoUtils.parseCognitoWebResponse(callbackHref);

        const session = yield cognitoUtils.getCognitoSession();
        yield put({type: types.SET_SESSION, payload: session});
    } catch (error) {
        console.log(error);
        yield put({type: types.SESSION_ERROR, payload: error});
    }
}

// Watches the trigger of PROCESS_SESSION action, this action is triggered, when the user logs-in
// and the callback component get the current URL arguments needed to fetch the access token and session
export function* watchProcessSession() {
    yield takeEvery(types.PROCESS_SESSION, initSessionFromCallbackURI);
}
