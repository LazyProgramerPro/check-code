import { put, select } from 'redux-saga/effects';
import { updateDriverError, updateDriverSuccess } from '../actions/update_driver';
import { UpdateDriverAction } from '../models';
import { updateDriver } from '../service/apis';
import { getDriver, reloadData } from '../actions/get_driver';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from 'src/models/baseResponse';
import { RootState } from 'src/redux/store';
export function* updateDriverAsync(action: UpdateDriverAction) {
  try {
    const rs = yield updateDriver(action.params);
    yield put(updateDriverSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Cập nhật driver thành công');
      const params = yield select((state: RootState) => state.driverConnect.getDriverState.params);
      yield put(getDriver(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateDriverError(new AppError(e.message)));
  }
}
