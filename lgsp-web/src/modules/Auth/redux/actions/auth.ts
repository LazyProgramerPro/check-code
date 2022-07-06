import {LoginInput, LoginResponse, LogoutRequest} from '../../types';
import {ActionBase, AppError} from '../../../../models/common';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export interface LoginAction extends ActionBase<LoginInput> {
}

export const login = (payload: LoginInput): LoginAction => ({
  type: LOGIN,
  payload,
});

export interface LoginSuccessAction extends ActionBase<LoginResponse> {
}

export const loginSuccess = (payload: LoginResponse): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export interface LoginErrorAction extends ActionBase<LoginResponse> {
}

export const loginError = (error: AppError): LoginErrorAction => ({
  type: LOGIN_ERROR,
  error,
});

export interface LogoutAction extends ActionBase<LogoutRequest> {
  check?: boolean,
  message?: string,
}

export const logout = (check?: boolean, message?: string): LogoutAction => {
  if(check == undefined){
    check = true;
  }
  if(message == undefined){
    message = 'Đăng xuất thành công';
  }
  return {
    type: LOGOUT,
    check: check,
    message: message
  }
};

export  const logoutSuccess = (): LogoutAction => ({
  type: LOGOUT_SUCCESS
})
