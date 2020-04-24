
import {all} from 'redux-saga/effects';
import {watchCallApi, watchGetAllWithFK} from './sagas';

export default function* rootSaga() {
    yield all([
        watchCallApi(),
        watchGetAllWithFK()
    ]);
}
