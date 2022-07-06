import { put, select } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { deleteResourceSuccess, reloadData } from '../actions/delete_resource';
import { getResource } from '../actions/get_resource';
import { DeleteResourceAction } from '../models';
import { deleteResource } from '../service/apis';

export function* deleteResourceAsync(action: DeleteResourceAction) {
  try {
    const rs = yield deleteResource(action?.param);
    yield put(deleteResourceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa giới hạn truy cập cho từng resource thành công');
      const params = yield select((state: RootState) => state.connectResource.getResourceState.params);
      yield put(getResource(params));
    } else {
      NotificationError('Thất bại', 'Xóa giới hạn truy cập cho từng resource thất bại');
    }
  } catch (error) {}
}
