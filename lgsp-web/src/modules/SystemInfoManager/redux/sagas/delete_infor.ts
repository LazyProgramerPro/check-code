import { put, select } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { deleteInforSuccess } from '../actions/delete_infor';
import { getSystemInfo, reloadData } from '../actions/get_systeminfo';
import { DeleteInforAction } from '../models';
import { deleteInfor } from '../services/apis';

export function* deleteInforAsync(action: DeleteInforAction) {
  try {
    const rs = yield deleteInfor(action?.param);
    yield put(deleteInforSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa thông tin giới thiệu hệ thống thành công');
      const params = yield select((state: RootState) => state.systemInforManager.getSystemInfoState.params);
      yield put(getSystemInfo(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {}
}
