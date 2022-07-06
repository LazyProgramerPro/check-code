import { call, put, takeEvery, all } from 'redux-saga/effects';
import { depositCryptoActions as actions } from '.';
import { WalletServices } from 'services/walletService';

function* handlegetCoin(action) {
  try {
    const response = yield call(WalletServices.GetCoin, action.payload);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getCoinSuccess(response.data.rows[0]));
    }
  } catch (err: any) {
    yield put(actions.getCoinFail(err.response));
    console.log(err);
  }
}
function* handlegetCoinList(action) {
  try {
    const response = yield call(WalletServices.GetAllCoin, action.payload);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getListCoinSuccess(response.data.rows));
    }
  } catch (err: any) {
    yield put(actions.getListCoinFail(err.response));
    console.log(err);
  }
}
function* handlegetListNetwork(action) {
  try {
    const response = yield call(WalletServices.GetNetwork, action.payload);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getNetworkSuccess(response.data.rows));
    }
  } catch (err: any) {
    yield put(actions.getNetworkFail(err.response));
    console.log(err);
  }
}
function* handlegetWallet(action) {
  console.log('action', action);
  const { network_id, token_id } = action.payload;
  try {
    const response = yield call(WalletServices.GetWallet, network_id, token_id);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getWalletSuccess(response.data.address));
    }
  } catch (err: any) {
    yield put(actions.getWalletFail(err.response));
    console.log(err);
  }
}

function* watchGetCoin() {
  yield takeEvery(actions.getCoinRequest, handlegetCoin);
}
function* watchGetListCoin() {
  yield takeEvery(actions.getListCoinRequest, handlegetCoinList);
}
function* watchGetListNetwork() {
  yield takeEvery(actions.getNetworkRequest, handlegetListNetwork);
}
function* watchGetWallet() {
  yield takeEvery(actions.getWalletRequest, handlegetWallet);
}
export function* depositCryptoSaga() {
  yield all([
    watchGetCoin(),
    watchGetListCoin(),
    watchGetListNetwork(),
    watchGetWallet(),
  ]);
}
