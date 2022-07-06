import { ApproveAction } from '../models';
import { put, select } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { statusServiceSuccess, reloadData } from '../actions/get_status_data_service';
import { statusDataService } from '../service/apis';
import { getAllDataService } from '../actions/get_data_services';
import { RootState } from 'src/redux/store';
export function* statusServiceAsync(action: ApproveAction) {
  try {
    const rs = yield statusDataService(action?.param);
    yield put(statusServiceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Công khai dịch vụ chia sẻ thành công');
      const params = yield select((state: RootState) => state.dataService.getState.params);
      yield put(getAllDataService(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {}
}
