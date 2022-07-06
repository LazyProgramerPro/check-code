import { CreateUserAction } from '../models';
import { acceptUserApi, createUser, rejectUserApi } from '../service/apis';
import {
  acceptUserError,
  acceptUserSuccess,
  createUserError,
  createUserSuccess,
  rejectUserError,
  rejectUserSuccess,
  showCreateUserForm,
} from '../action/create_user';
import { put } from 'redux-saga/effects';
import { loadPage, reloadData } from '../action/get_users';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';

export function* createUserAsync(action: CreateUserAction) {
  try {
    const rs = yield createUser(action.params);
    yield put(createUserSuccess());
    yield put(showCreateUserForm(false));
    yield put(reloadData());
    yield put(loadPage());
    if (rs.code == 0) {
      NotificationSuccess('Thành công', 'Tạo mới tài khoản thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createUserError(new AppError(e.message)));
  }
}

export function* acceptUserAsync(action: CreateUserAction) {
  try {
    const rs = yield acceptUserApi(action.accountId);

    if (rs.code === 0) {
      yield put(acceptUserSuccess());
      NotificationSuccess('Thành công', 'Duyệt tài khoản thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    yield put(acceptUserError(new AppError(error.message)));
    NotificationError('Thất bại', error.message);
  }
}

export function* rejectUserAsync(action: CreateUserAction) {
  try {
    const rs = yield rejectUserApi(action.rejectParam);

    if (rs.code === 0) {
      yield put(rejectUserSuccess());
      NotificationSuccess('Thành công', 'Từ chối tài khoản thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    yield put(rejectUserError(new AppError(error.message)));
    NotificationError('Thất bại', error.message);
  }
}
