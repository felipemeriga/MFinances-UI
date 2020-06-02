import {put, takeEvery} from "@redux-saga/core/effects";
import * as types from "../actions/types";
import {handleApiRequest} from "./sagas";
import {api} from "../services";
import {PLANNING_TABLE} from "../actions/types";
import {ENDPOINTS} from "../actions/types";


export function* validateCategoryAlreadyExistsInMonth(action) {
    try {
        const request = yield api.callApi(action.payload);
        // This clause is to check if the backend returned an existing planning
        if(request.id) {
            yield put({type: PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH' + '_SUCCESS'], payload: request});
        } else {
            const postPayload = {
                type: 'PLANNING_TABLE',
                method: 'post',
                config: {
                    reFetch: true,
                    data: action.payload.data,
                    headers:{},
                    endpoint: ENDPOINTS['PLANNING_TABLE'],
                    arguments: ''
                }
            };
            yield put({type: types.CALL_API, payload: postPayload});
        }
    } catch (error) {
        yield put({type: PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH' + '_ERROR'], payload: error.response.data});
    }

}


export function* watchValidateCategoryAlreadyExistsInMonth() {
    yield takeEvery(types.PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH'], validateCategoryAlreadyExistsInMonth);
}
