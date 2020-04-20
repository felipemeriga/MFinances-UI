
import {all} from 'redux-saga/effects';
import {watchCallApi} from './sagas';

export default function* rootSaga() {
    yield all([
        watchCallApi()
    ]);
}
