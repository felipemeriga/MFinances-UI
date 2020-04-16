
import {all} from 'redux-saga/effects';
import {watchCallApi} from './planningSaga';

export default function* rootSaga() {
    yield all([
        watchCallApi()
    ]);
}
