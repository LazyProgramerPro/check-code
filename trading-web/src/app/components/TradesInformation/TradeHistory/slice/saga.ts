import { call, put, takeLatest } from 'redux-saga/effects';
import { tradehistoryActions as actions } from '.';
import { tradesServices } from 'services/tradesService';

function* handleGetTradeHistory(action) {
  const { startTime, endTime, pageIndex, pageSize } = action.payload;
  try {
    const response = yield call(
      tradesServices.TradeHistory,
      startTime,
      endTime,
      pageIndex,
      pageSize,
    );
    if (response.data.rc === 0) {
      yield put(actions.getTradeHistorySuccess(response.data.rows));
    }
  } catch (error: any) {
    yield put(actions.getTradeHistoryFail(error.response));
    console.log(error);
  }
}

export function* tradehistorySaga() {
  yield takeLatest(actions.getTradeHistoryRequest, handleGetTradeHistory);
}
