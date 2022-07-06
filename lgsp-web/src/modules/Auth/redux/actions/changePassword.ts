import {AppError} from '../../../../models/common';

export const CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export interface ChangePasswordAction {
  type: string;
  payload?: any;
  error?: AppError;
}

export const changePassword = (payload: any
): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_ACTION,
  payload: payload
});

export const changePasswordSuccess = (payload: any = null): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const changePasswordError = (error: AppError): ChangePasswordAction => ({
  type: CHANGE_PASSWORD_ERROR,
  error,
});
