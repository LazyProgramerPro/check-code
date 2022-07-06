import {put, take} from 'redux-saga/effects';
import * as apis from './../../services/apis';
import {
  LoginAction,
  loginError,
  loginSuccess,
  LoginSuccessAction,
  LOGOUT_SUCCESS,
  LogoutAction,
  logoutSuccess
} from '../actions';
import {AppError, UserRole} from '../../../../models/common';
import {setToken} from '../../../../helpers/token';
import {LoginRequest, LoginResponse} from '../../types';
import history from 'src/history';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';
import {logoutService} from "../../services/apis";
import {PASSWORD, REMEMBER, TOKEN_KEY, USERNAME} from "../../../../constants/common";

export function* loginAsync(action: LoginAction) {
  try {
    const param: LoginRequest = {
      username: action.payload?.username || '',
      password: action.payload?.password || '',
    }
    const loginPayload = yield apis.login(param);
    if (loginPayload.code === 0) {
      NotificationSuccess('Thành công', 'Đăng nhập thành công');
      localStorage.setItem(TOKEN_KEY, JSON.stringify(loginPayload || {}));
      if(action.payload?.remember){
        localStorage.setItem(USERNAME, action.payload.username);
        localStorage.setItem(PASSWORD, action.payload.password);
        localStorage.setItem(REMEMBER, 'true');
      }else {
        localStorage.removeItem(USERNAME);
        localStorage.removeItem(PASSWORD);
        localStorage.removeItem(REMEMBER);
      }

      yield put(loginSuccess(loginPayload));
      if (loginPayload?.token) {
        if(action.payload?.previous != undefined && action.payload?.previous != ''){
          history.push(action.payload.previous);
          return;
        }
        const role: number = loginPayload.role;
        if (role == UserRole.ADMIN_VALUE) {
          history.push('/system-infor-manager');
        } else if (role == UserRole.PROVIDER_VALUE) {
          history.push('/manager-infor/group-api-config');
        } else {
          history.push('/manager-infor/data-public');
        }
      }
    } else {
      NotificationError('Thất bại', loginPayload.message);
      yield put(loginError(new AppError(loginPayload.message)));
    }
  } catch (error) {
    console.log('function*loginAsync -> error', error);
    yield put(loginError(new AppError(error.message)));
  }
}

export function loginSuccessAsync(action: LoginSuccessAction) {
  setToken(action.payload?.token);
}

export function* logoutAsync(action: LogoutAction){
  if(action.check){
    const rs = yield logoutService();
    if(rs.code == 0){
      yield put(logoutSuccess());
      localStorage.removeItem(TOKEN_KEY);
      NotificationSuccess('Thành công', 'Đăng xuất thành công');
      history.push('/home');
    }else {
      NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
    }
  }else {
    const message = action.message || '';
    console.log("message: " + message);
    if(message == ''){
      yield put(logoutSuccess());
      history.push('/login');
      return;
    }else {
      yield put(logoutSuccess());
      localStorage.removeItem(TOKEN_KEY);
      history.push('/login');
      NotificationSuccess('Thông báo', message);
    }
  }

}

export function* loginCheckerAsync() {
  while (1) {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken && savedToken !== '{}') {
      const loginResponse: LoginResponse = JSON.parse(savedToken);
      yield put(loginSuccess(loginResponse));
    }
    yield take(LOGOUT_SUCCESS);
    localStorage.removeItem(TOKEN_KEY);
  }
}
