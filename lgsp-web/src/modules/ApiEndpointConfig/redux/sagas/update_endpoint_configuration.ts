import { put } from 'redux-saga/effects';
import { UpdateApiEndpointConfigurationAction } from '../models';
import { updateApiEndpointConfigurationService } from '../services/apis';
import {
  updateApiEndpointConfigurationError,
  updateApiEndpointConfigurationSuccess,
} from '../actions/update_endpoint_configuration';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';

export function* updateApiEndpointConfigurationAsync(action: UpdateApiEndpointConfigurationAction) {
  try {
    const rs = yield updateApiEndpointConfigurationService(action.params);
    console.log('Resp : ' + JSON.stringify(rs));

    if (rs.code === 0) {
      NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
      yield put(updateApiEndpointConfigurationSuccess(rs));
      return;
    }

    NotificationError('Thất bại', rs.message);
  } catch (error) {
    yield put(updateApiEndpointConfigurationError(error));
    NotificationError('Thất bại', error.message);
  }
}
