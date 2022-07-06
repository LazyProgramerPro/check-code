import { put, select } from 'redux-saga/effects';
import { createResourceSuccess, showCreateResourceForm, createResourceError } from '../actions/create_resource';
import { createResource } from '../service/apis';
import { loadPage } from '../actions/get_resource';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { CreateResourceAction } from '../models';
import { RootState } from 'src/redux/reducers';

export function* createResourceAsyns(action: CreateResourceAction) {
  try {
    const rs = yield createResource(action.params);
    yield put(createResourceSuccess());
    yield put(showCreateResourceForm(false));
    yield put(loadPage());
    if (rs.code == 0) {
      NotificationSuccess('Thành Công', 'Tạo mới giới hạn truy cập cho từng resource thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createResourceError(e));
  }
}
