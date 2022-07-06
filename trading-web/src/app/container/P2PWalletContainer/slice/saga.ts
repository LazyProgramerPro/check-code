import { call, put, takeLatest, all } from 'redux-saga/effects';
import { P2PWalletActions as actions } from '.';
import { P2PWalletServices } from 'services/p2pWalletService';

function* handleGetP2PWallet() {
  try {
    const response = yield call(P2PWalletServices.getAllP2PWallet);
    if (response.data.rc === 0) {
      yield put(actions.getP2PWalletSuccess(response.data));
    }
  } catch (error: any) {
    yield put(actions.getP2PWalletFail(error.response));
    console.log(error);
  }
}

export function* watchP2PWallet() {
  yield takeLatest(actions.getP2PWalletRequest, handleGetP2PWallet);
}
export function* p2pWalletSaga() {
  yield all([watchP2PWallet()]);
}
