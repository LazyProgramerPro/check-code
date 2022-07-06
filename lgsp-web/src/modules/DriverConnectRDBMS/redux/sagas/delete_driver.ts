import { put, select } from 'redux-saga/effects';
import { RootState } from 'src/redux/store';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { deleteDriverSuccess, reloadData } from '../actions/delete_driver';
import { getDriver } from '../actions/get_driver';
import { DeleteDriverAction } from '../models';
import { deleteDriver } from '../service/apis';

export function* deleteDriverAsync(action: DeleteDriverAction) {
  try {
    const rs = yield deleteDriver(action.param);
    yield put(deleteDriverSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa driver thành công');
      const params = yield select((state: RootState) => state.driverConnect.getDriverState.params);
      yield put(getDriver(params));
    } else {
      NotificationError('Thất bại', 'Xóa giới hạn truy cập cho từng driver thất bại');
    }
  } catch (error) {}
}
