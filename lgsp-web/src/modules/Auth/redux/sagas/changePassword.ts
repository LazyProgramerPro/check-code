import { put } from 'redux-saga/effects';
import * as apis from './../../services/apis';
import { ChangePasswordAction, changePasswordError, changePasswordSuccess, hideChangePasswordForm } from '../actions';
import { AppError } from '../../../../models/common';
import { NotificationSuccess } from 'src/components/Notification/Notification';

export function* changePasswordAsync(action: ChangePasswordAction) {
  try {
    const rs = yield apis.changePassword(action.payload);
    yield put(changePasswordSuccess(rs.rc));
    yield put(hideChangePasswordForm());
    NotificationSuccess('Thành công', 'Thay đổi mật khẩu thành công');
  } catch (error) {
    yield put(changePasswordError(new AppError(error.message)));
  }
}
