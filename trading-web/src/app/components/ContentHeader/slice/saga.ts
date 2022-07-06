import { call, put, takeLatest } from 'redux-saga/effects';
import { currentPairActions as actions } from '.';
import { CurrentPairServices } from 'services/currentPairService';

function* handleGetCurrentPair(action) {
  const { pair, ts } = action.payload;
  try {
    const response = yield call(CurrentPairServices.GetCurrentPair, pair, ts);
    if (response.data.rc === 0) {
      yield put(actions.getCurrentPairSuccess(response.data));
    }
  } catch (error: any) {
    yield put(actions.getCurrentPairFail(error.response));
  }
}

export function* currentPairSaga() {
  yield takeLatest(actions.getCurrentPairRequest, handleGetCurrentPair);
}
