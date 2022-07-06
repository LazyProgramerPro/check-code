import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getopenOrderActions as actions } from '.';
import { OpenOrderServices } from 'services/openOrderService';

function* handleGetOpenOrder(action) {
  const { pageIndex, pageSize } = action.payload;
  try {
    const response = yield call(
      OpenOrderServices.getOpenOrder,
      pageIndex,
      pageSize,
    );
    if (response.data.rc === 0) {
      yield put(actions.getopenOrderSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.getopenOrderFail(err.response));
    console.log(err);
  }
}

function* handleCancelOpenOrder(action) {
  const { orderId, baseSymbol, quoteSymbol, wallet } = action.payload;
  try {
    const response = yield call(
      OpenOrderServices.cancelOpenOrder,
      orderId,
      baseSymbol,
      quoteSymbol,
      wallet,
    );
    if (response.data.rc === 0) {
      yield put(actions.cancelOrderSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.cancelOrderFail(err.response));
    console.log(err);
  }
}

function* watchGetOpenOrder() {
  yield takeEvery(actions.getopenOrderRequest, handleGetOpenOrder);
}
function* watchCancelOpenOrder() {
  yield takeEvery(actions.cancelOrderRequest, handleCancelOpenOrder);
}
export function* getopenOrderSaga() {
  yield all([watchGetOpenOrder(), watchCancelOpenOrder()]);
}
