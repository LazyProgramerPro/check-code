import { CreateUserAction, UpdateUserAction } from '../models';
import { updateUser } from '../service/apis';
import { put } from 'redux-saga/effects';
import { reloadData } from '../action/get_users';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { showUpdateUserForm, updateUserError, updateUserSuccess } from '../action/update_user';

export function* updateUserAsync(action: UpdateUserAction) {
  try {
    const rs = yield updateUser(action.param);
    yield put(updateUserSuccess());
    yield put(showUpdateUserForm(false));
    yield put(reloadData());
    if (rs.code == 0) {
      NotificationSuccess('Thành công', 'Cập nhật thông tin tài khoản thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateUserError(new AppError(e.message)));
  }
}
