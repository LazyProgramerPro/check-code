import { takeEvery, all, put, call } from 'redux-saga/effects';
import { loginActions as actions } from '.';
import { authService } from 'services/authService';
import { toastActions } from 'app/components/Toast/slice';

function* handleLogin(action) {
  const { email, password, recaptcha_response } = action.payload;

  try {
    const response = yield call(
      authService.login,
      email,
      password,
      recaptcha_response,
    );
    if (response.data.rc === 0) {
      yield put(actions.loginSuccess(response.data));
      yield put(actions.handleStepLogin(2));
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Email code sent successfully',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(actions.loginFail(response.data));
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: response.data.rd,
        }),
      );
    }
  } catch (err: any) {
    yield put(actions.loginFail(err.response));
    console.log(err);
  }
}
function* handleVerifyEmailLogin(action) {
  const { email, code } = action.payload;
  try {
    const response = yield call(authService.verifyEmailLogin, email, code);
    if (response.data.rc === 0) {
      yield put(actions.verifyEmailLoginSuccess(response.data));
      yield call(authService.setAccessToken, response.data.access_token);
      yield call(authService.setUserId, response.data.userId);
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Login success',
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
    yield put(actions.verifyEmailLoginFail(err.response));
    console.log(err);
  }
}

function* watchLogin() {
  yield takeEvery(actions.loginRequest, handleLogin);
}
function* watchVerifyEmailLogin() {
  yield takeEvery(actions.verifyEmailLoginRequest, handleVerifyEmailLogin);
}
export function* loginSaga() {
  yield all([watchLogin(), watchVerifyEmailLogin()]);
}
