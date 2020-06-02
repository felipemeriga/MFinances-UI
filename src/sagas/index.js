
import {all} from 'redux-saga/effects';
import {watchCallApi, watchGetAllWithFK} from './sagas';
import {watchValidateCategoryAlreadyExistsInMonth} from './planningSaga';

export default function* rootSaga() {
    yield all([
        watchCallApi(),
        watchGetAllWithFK(),
        watchValidateCategoryAlreadyExistsInMonth()
    ]);
}
