import { UpdateApiResourceAction } from '../models';
import { updateApiResourcesService } from '../services/apis';
import { put } from 'redux-saga/effects';
import { updateApiResourceError, updateApiResourceSuccess } from '../actions/update_api_resource';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';

export function* updateApiResourceAsync(action: UpdateApiResourceAction) {
  try {
    const rs = yield updateApiResourcesService(action.params);
    yield put(updateApiResourceSuccess(rs));
    if (rs.code === 0) {
      NotificationSuccess('Thành công', 'Cập nhật Resource chia sẻ thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    NotificationError('Thất bại', error.message);
    yield put(updateApiResourceError(error));
  }
}
