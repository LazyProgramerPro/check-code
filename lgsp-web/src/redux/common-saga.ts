import {put, take} from 'redux-saga/effects';
import {ActionBase} from 'src/models/common';
import {logout} from 'src/modules/Auth/redux/actions';

export function* checkErrorAsync() {
  while (true) {
    const action: ActionBase<{}> = yield take((action: ActionBase<{}>) => /.+_ERROR/.test(action.type));
    // console.log(components);
    if (action.error?.code === 6) {
      yield put(logout());
    } else {
      // NotificationError('Cảnh báo', components.error?.message || 'Có lỗi xảy ra vui lòng thử lại sau');
      // console.log('err => ', components.error?.message || 'Có lỗi xảy ra vui lòng thử lại sau');
    }
  }
}
