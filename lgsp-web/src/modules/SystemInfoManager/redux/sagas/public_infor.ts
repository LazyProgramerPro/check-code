import { put } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { publicInforSuccess, reloadData } from '../actions/public_infor';
import { PublicInforAction } from '../models';
import { publicInfor } from '../services/apis';

export function* publicAsync(action: PublicInforAction) {
  try {
    const rs = yield publicInfor(action?.param);
    yield put(publicInforSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Công khai thông tin giới thiệu thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {}
}
