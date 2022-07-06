import { all, call, put, takeEvery } from 'redux-saga/effects';
import { buyspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';
import { toastActions } from 'app/components/Toast/slice';
import { getBalancePairActions } from 'app/components/OrderForm/slice';

function* handlebuyspotlimit(action) {
  const { pair_id, type, price, amount, stop, limit } = action.payload;
  try {
    const response = yield call(
      spotTradeServices.buySpotLimit,
      pair_id,
      type,
      price,
      amount,
      stop,
      limit,
    );
    if (response.data.rc === 0) {
      yield put(actions.buyspotlimitSuccess(response.data));
      yield put(getBalancePairActions.regetBalance());
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Successfully purchase',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: 'Buy failed',
        }),
      );
    }
  } catch (err: any) {
    yield put(actions.buyspotlimitFail(err.response));
    console.log(err);
  }
}

function* watchbuyspotlimit() {
  yield takeEvery(actions.buyspotlimitRequest, handlebuyspotlimit);
}

export function* buyspotlimitSaga() {
  yield all([watchbuyspotlimit()]);
}
