import { put } from 'redux-saga/effects';
import { UpdateApiGeneralInformationAction } from '../models';
import { getApiGeneralInformationService, updateApiGeneralInformationService } from '../services/apis';
import {
  updateApiGeneralInformationError,
  updateApiGeneralInformationSuccess,
} from '../actions/update_general_information';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';

export function* updateApiGeneralInformationAsync(action: UpdateApiGeneralInformationAction) {
  try {
    const rs = yield updateApiGeneralInformationService(action.params);
    yield put(updateApiGeneralInformationSuccess(rs));
    if (rs.code == 0) {
      NotificationSuccess('Thành công', 'Cập nhật thông tin dịch vụ chia sẻ thành công');
      yield getApiGeneralInformationService(action?.params?.apiId);
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    yield put(updateApiGeneralInformationError(error));
  }
}
