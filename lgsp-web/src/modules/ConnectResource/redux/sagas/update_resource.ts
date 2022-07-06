import { put, select } from 'redux-saga/effects';
import { updateResourceError, updateResourceSuccess } from '../actions/update_resource';
import { UpdateResourceAction } from '../models';
import { updateResource } from '../service/apis';
import { getResource, reloadData } from '../actions/get_resource';
import { AppError } from '../../../../models/common';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { RootState } from 'src/redux/store';
export function* updateResourceAsync(action: UpdateResourceAction) {
  try {
    const rs = yield updateResource(action.params);
    yield put(updateResourceSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Cập nhật giới hạn truy cập cho từng resource thành công');
      const params = yield select((state: RootState) => state.connectResource.getResourceState.params);
      yield put(getResource(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateResourceError(new AppError(e.message)));
  }
}
