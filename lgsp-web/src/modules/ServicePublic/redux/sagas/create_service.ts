import { put, select } from 'redux-saga/effects';
import { createServiceSuccess, showCreateServiceForm, createServiceError } from '../actions/create_service';
import { CreateServiceAction } from '../models';
import { createService } from '../services/apis';
import { getService, loadPage, reloadData } from '../actions/get_service';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { RootState } from 'src/redux/store';
export function* createServiceAsyns(action: CreateServiceAction) {
  try {
    const rs = yield createService(action.params);
    yield put(createServiceSuccess());
    yield put(showCreateServiceForm(false));
    yield put(loadPage());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Tạo mới dịch vụ chia sẻ thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    yield put(createServiceError(error));
  }
}
