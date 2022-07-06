import { put, select } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { deleteServiceSuccess, reloadData } from '../actions/delete_service';
import { getService } from '../actions/get_service';
import { DeleteServiceAction } from '../models';
import { deleteService } from '../services/apis';

export function* deleteServiceAsync(action: DeleteServiceAction) {
  try {
    const rs = yield deleteService(action?.param);
    yield put(deleteServiceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa dịch vụ chia sẻ thành công');
      const params = yield select((state: RootState) => state.servicePublic.getState.params);
      yield put(getService(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {}
}
