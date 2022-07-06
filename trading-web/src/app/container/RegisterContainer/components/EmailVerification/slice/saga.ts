import { all, call, put, takeEvery } from 'redux-saga/effects';
import { verifyEmailRegisterActions as actions } from '.';
import { authService } from 'services/authService';
import { toastActions } from 'app/components/Toast/slice';

function* handleRegisterVerifyEmail(action) {
  const { email, code } = action.payload;
  try {
    const response = yield call(authService.verifyEmailRegister, email, code);
    yield put(actions.registerVerifyEmailSuccess(response.data));
    if (response.data.rc === 0) {
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Register Success',
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
    yield put(actions.registerVerifyEmailFail(err.response));
    console.log(err);
  }
}
function* watchRegisterVerifyEmail() {
  yield takeEvery(
    actions.registerVerifyEmailRequest,
    handleRegisterVerifyEmail,
  );
}

export function* registerVerifyEmailSaga() {
  yield all([watchRegisterVerifyEmail()]);
}
