
import {all} from 'redux-saga/effects';
import {watchCallApi, watchGetAllWithFK} from './apiSagas';
import {watchValidateCategoryAlreadyExistsInMonth} from './planningSaga';
import {watchProcessSession} from './sessionSaga';

export default function* rootSaga() {
    yield all([
        watchCallApi(),
        watchGetAllWithFK(),
        watchValidateCategoryAlreadyExistsInMonth(),
        watchProcessSession()
    ]);
}
