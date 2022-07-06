import { DeleteUserAction } from '../models';
import { checkDeleteUser, deleteUser } from '../service/apis';
import { deleteUserError, deleteUserSuccess, showDeleteUserConfirm } from '../action/delete_user';
import { put } from 'redux-saga/effects';
import { reloadData } from '../action/get_users';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';

export function* deleteUserAsync(action: DeleteUserAction) {
  try {
    const rs = yield deleteUser(action?.param);
    console.log(JSON.stringify(rs));
    yield put(deleteUserSuccess());
    yield put(showDeleteUserConfirm(false));
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa tài khoản thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(deleteUserError(new AppError(e.message)));
  }
}
