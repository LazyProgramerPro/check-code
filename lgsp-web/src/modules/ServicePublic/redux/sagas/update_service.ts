import { UpdateServiceAction } from '../models';
import { put, select } from 'redux-saga/effects';
import { getService, reloadData } from '../actions/get_service';
import { AppError } from '../../../../models/common';
import { updateServiceError, updateServiceSuccess } from '../actions/update_service';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { updateService } from '../services/apis';
import { RootState } from 'src/redux/store';
export function* updateServiceAsync(action: UpdateServiceAction) {
  try {
    const rs = yield updateService(action.params);
    yield put(updateServiceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Cập nhật dịch vụ thành công');
      const params = yield select((state: RootState) => state.servicePublic.getState.params);
      yield put(getService(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateServiceError(new AppError(e.message)));
  }
}
