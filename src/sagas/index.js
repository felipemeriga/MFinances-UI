
import {fork, all} from 'redux-saga/effects';
import {watchGetPlannings, watchCallApi} from './planningSaga';

export default function* rootSaga() {
    yield all([
        watchGetPlannings(),
        watchCallApi()
    ]);
}
