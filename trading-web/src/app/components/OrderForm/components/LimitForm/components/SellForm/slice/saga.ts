import { all, call, put, takeEvery } from 'redux-saga/effects';
import { sellspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';
import { toastActions } from 'app/components/Toast/slice';
import { getBalancePairActions } from 'app/components/OrderForm/slice';

function* handlesellspotlimit(action) {
  const { pair_id, type, price, amount, stop, limit } = action.payload;
  try {
    const response = yield call(
      spotTradeServices.sellSpotLimit,
      pair_id,
      type,
      price,
      amount,
      stop,
      limit,
    );
    if (response.data.rc === 0) {
      yield put(actions.sellspotlimitSuccess(response.data));
      yield put(getBalancePairActions.regetBalance());
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Successfully sell',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: 'Sell failed',
        }),
      );
    }
  } catch (err: any) {
    yield put(actions.sellspotlimitFail(err.response));
    console.log(err);
  }
}

function* watchsellspotlimit() {
  yield takeEvery(actions.sellspotlimitRequest, handlesellspotlimit);
}

export function* sellspotlimitSaga() {
  yield all([watchsellspotlimit()]);
}
