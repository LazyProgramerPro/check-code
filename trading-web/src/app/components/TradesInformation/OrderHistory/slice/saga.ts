import { call, put, takeEvery, all } from 'redux-saga/effects';
import { orderhistoryActions as actions } from '.';
import { OrderHistoryServices } from 'services/orderHistoryService';

function* handleGetOrderHistory(action) {
  const { startTime, endTime, status, pageIndex, pageSize } = action.payload;
  try {
    const response = yield call(
      OrderHistoryServices.getOrderHistory,
      startTime,
      endTime,
      status,
      pageIndex,
      pageSize,
    );
    if (response.data.rc === 0) {
      yield put(actions.getOrderhistorySuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.getOrderhistoryFail(err.response));
    console.log(err);
  }
}

function* watchGetOrderHistory() {
  yield takeEvery(actions.getOrderhistoryRequest, handleGetOrderHistory);
}
export function* orderhistorySaga() {
  yield all([watchGetOrderHistory()]);
}
