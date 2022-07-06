import { put } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { checkApiEndpointConfigurationError, checkApiEndpointConfigurationSuccess } from '../actions/check_endpoint';
import { CheckApiEndpointConfigurationAction } from '../models';
import { checkApiEndpointConfigurationService } from '../services/apis';

export function* checkApiEndpointConfigurationAsync(action: CheckApiEndpointConfigurationAction) {
  try {
    const rs = yield checkApiEndpointConfigurationService(action.params);
    console.log('Resp : ' + JSON.stringify(rs));

    if (rs.code === 0) {
      NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
      yield put(checkApiEndpointConfigurationSuccess(rs));
      return;
    }

    NotificationError('Thất bại', rs.message);
  } catch (error) {
    yield put(checkApiEndpointConfigurationError(error));
    NotificationError('Thất bại', error.message);
  }
}
