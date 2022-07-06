import { call, put, takeLatest, all } from 'redux-saga/effects';
import { spotWalletActions as actions } from '.';
import { SpotWalletServices } from 'services/spotWalletService';

function* handleGetSpotWallet() {
  try {
    const response = yield call(SpotWalletServices.getAllSpotWallet);
    if (response.data.rc === 0) {
      yield put(actions.getSpotWalletSuccess(response.data));
    }
  } catch (error: any) {
    yield put(actions.getSpotWalletFail(error.response));
    console.log(error);
  }
}

export function* watchSpotWallet() {
  yield takeLatest(actions.getSpotWalletRequest, handleGetSpotWallet);
}
export function* spotWalletSaga() {
  yield all([watchSpotWallet()]);
}
