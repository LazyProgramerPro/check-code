import { call, put, takeLatest } from 'redux-saga/effects';
import { getBalancePairActions as actions } from '.';
import { SpotWalletServices } from 'services/spotWalletService';

function* handleGetBalancePair(action) {
  try {
    const response = yield call(
      SpotWalletServices.getPairValueSpotWallet,
      action.payload,
    );
    if (response.data.rc === 0) {
      yield put(actions.getBalancePairSpotSuccess(response.data));
    }
  } catch (error: any) {
    yield put(actions.getBalancePairSpotFail(error.response));
    console.log(error);
  }
}

export function* getBalancePairSaga() {
  yield takeLatest(actions.getBalancePairSpotRequest, handleGetBalancePair);
}
