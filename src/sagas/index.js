
import {fork, all} from 'redux-saga/effects';
import {watchGetPlannings} from './planningSaga';

export default function* rootSaga() {
    yield all([
        watchGetPlannings(),
    ]);
}
