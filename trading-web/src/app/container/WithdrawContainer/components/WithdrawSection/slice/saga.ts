import { call, put, takeEvery, all } from 'redux-saga/effects';
import { withdrawCryptoActions as actions } from '.';
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
function* handlegetFeeTransfer(action) {
  console.log('action', action);
  const { network_id, token_id } = action.payload;
  try {
    const response = yield call(
      WalletServices.GetFeeTransfer,
      network_id,
      token_id,
    );
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getFeeTransferSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.getFeeTransferFail(err.response));
    console.log(err);
  }
}
function* handlegetCoinBalance(action) {
  const { wallet_type, token_id } = action.payload;
  try {
    const response = yield call(
      WalletServices.GetCoinBalance,
      wallet_type,
      token_id,
    );
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getCoinBalanceSuccess(response.data.balance));
    }
  } catch (err: any) {
    yield put(actions.getCoinBalanceFail(err.response));
    console.log(err);
  }
}
function* handlewithdraw(action) {
  console.log(action.payload);
  try {
    const response = yield call(WalletServices.Withdraw, action.payload);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.withdrawSuccess(response.data.balance));
    }
  } catch (err: any) {
    yield put(actions.withdrawFail(err.response));
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
function* watchGetFeeTransfer() {
  yield takeEvery(actions.getFeeTransferRequest, handlegetFeeTransfer);
}
function* watchGetCoinBalance() {
  yield takeEvery(actions.getCoinBalanceRequest, handlegetCoinBalance);
}
function* watchWithdraw() {
  yield takeEvery(actions.withdrawRequest, handlewithdraw);
}
export function* withdrawCryptoSaga() {
  yield all([
    watchGetCoin(),
    watchGetListCoin(),
    watchGetListNetwork(),
    watchGetFeeTransfer(),
    watchGetCoinBalance(),
    watchWithdraw(),
  ]);
}
