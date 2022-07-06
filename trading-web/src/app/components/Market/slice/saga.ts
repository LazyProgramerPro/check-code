import { call, put, takeLatest } from 'redux-saga/effects';
import { getallpairActions as actions } from '.';
import { MarketServices } from 'services/marketService';

function* handleGetAllPair() {
  try {
    const response = yield call(MarketServices.GetAllPair);
    if (response.data.rc === 0) {
      yield put(actions.getAllPairSuccess(response.data));
      yield put(actions.reselectPair());
    }
  } catch (err: any) {
    yield put(actions.getAllPairFail(err.response));
    console.log(err);
  }
}

export function* getallpairSaga() {
  yield takeLatest(actions.getAllPairRequest, handleGetAllPair);
}
