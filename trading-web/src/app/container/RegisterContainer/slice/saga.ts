import { all, call, put, takeEvery } from 'redux-saga/effects';
import { registerActions as actions } from '.';
import { authService } from 'services/authService';
import { toastActions } from 'app/components/Toast/slice';

function* handleRegister(action) {
  const { email, password, referralId, allowReceiveEmail, allowShareData } =
    action.payload;
  try {
    const response = yield call(
      authService.register,
      email,
      password,
      referralId,
      allowReceiveEmail,
      allowShareData,
    );
    if (response.data.rc === 0) {
      yield put(actions.registerSuccess(response.data));
      yield put(actions.handleStepRegister(2));
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Email code sent successfully',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: response.data.rd,
        }),
      );
    }
  } catch (err: any) {
    yield put(actions.registerFail(err.response));
    console.log(err);
  }
}

function* watchRegister() {
  yield takeEvery(actions.registerRequest, handleRegister);
}

export function* registerSaga() {
  yield all([watchRegister()]);
}
