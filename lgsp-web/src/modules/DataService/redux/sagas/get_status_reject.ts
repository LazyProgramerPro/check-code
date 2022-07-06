import { put, select } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { reloadData } from '../actions/get_data_services';
import { requestServiceError, requestServiceSuccess } from '../actions/get_status_reject';
import { RejectAction } from '../models';
import { statusDataReject } from '../service/apis';
import { AppError } from '../../../../models/common';
import { RootState } from 'src/redux/store';
import { getAllDataService } from '../actions/get_data_services';
export function* statusRejectAsync(action: RejectAction) {
  try {
    const rs = yield statusDataReject(action.params);
    yield put(requestServiceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Từ chối công khai dịch vụ chia sẻ thành công');
      const params = yield select((state: RootState) => state.dataService.getState.params);
      yield put(getAllDataService(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(requestServiceError(new AppError(e.message)));
  }
}
