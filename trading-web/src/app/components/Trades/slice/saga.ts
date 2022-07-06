import { call, put, takeLatest } from 'redux-saga/effects';
import { tradesActions as actions } from '.';
import { tradesServices } from 'services/tradesService';

function* handleGetAllTrades(action) {
  try {
    const response = yield call(tradesServices.Trades, action.payload);
    if (response.data.rc === 0) {
      yield put(actions.getTradesSuccess(response));
    }
  } catch (error: any) {
    yield put(actions.getTradesFail(error.response));
    console.error(error);
  }
}

export function* tradesSaga() {
  yield takeLatest(actions.getTradesRequest, handleGetAllTrades);
}
