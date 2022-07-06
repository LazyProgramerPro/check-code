import { all, call, put, takeEvery } from 'redux-saga/effects';
import { orderbookActions as actions } from '.';
import { OrderbookServices } from 'services/orderbookService';

function* handleGetOrderbook(action) {
  const { pair, limit } = action.payload;
  try {
    const response = yield call(OrderbookServices.Orderbook, {
      pair,
      limit: limit,
    });
    if (response.data.rc === 0) {
      yield put(actions.getOrderbookSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.getOrderbookFail(err.response));
    yield put(actions.getOrderbookSuccess(null));
    console.log(err);
  }
}

function* watchGetOrderbook() {
  yield takeEvery(actions.getOrderbookRequest, handleGetOrderbook);
}
export function* orderbookSaga() {
  yield all([watchGetOrderbook()]);
}
