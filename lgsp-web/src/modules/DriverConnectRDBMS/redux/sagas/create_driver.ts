import { put, select } from 'redux-saga/effects';
import { CreateDriverAction } from '../models';
import { createDriverSuccess, showCreateDriverForm, createDriverError } from '../actions/create_driver';
import { createDriver } from '../service/apis';
import { getDriver, loadPage, reloadData } from '../actions/get_driver';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { RootState } from 'src/redux/store';
export function* createDriverAsyns(action: CreateDriverAction) {
  try {
    const rs = yield createDriver(action?.params);
    yield put(createDriverSuccess());
    yield put(showCreateDriverForm(false));
    yield put(loadPage());
    if (rs.code == 0) {
      NotificationSuccess('Thành Công', 'Tạo mới driver thành công');
      // const params = yield select((state: RootState) => state.driverConnect.getDriverState.params);
      // yield put(getDriver(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createDriverError(new AppError(e.message)));
  }
}
