import { put, select } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from 'src/models/baseResponse';
import { RootState } from 'src/redux/store';
import { getSystemInfo, reloadData } from '../actions/get_systeminfo';
import { updateContentError, updateContentSuccess } from '../actions/update_content';
import { UpdateContentAction } from '../models';
import { updateSystemIntroInforService } from '../services/apis';

export function* updateContentAsync(action: UpdateContentAction) {
  try {
    const rs = yield updateSystemIntroInforService(action.params);
    yield put(updateContentSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Cập nhật thông tin giới thiệu thành công');
      const params = yield select((state: RootState) => state.systemInforManager.getSystemInfoState.params);
      yield put(getSystemInfo(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    // yield put(updateContentError(new AppError(e.message)));
  }
}
