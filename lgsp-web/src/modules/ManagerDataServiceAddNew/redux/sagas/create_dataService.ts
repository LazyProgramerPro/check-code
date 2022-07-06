import { put } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from 'src/models/common';
import {
  createDataServiceError,
  createDataServiceSuccess,
  getDetailDataServiceUpdateError,
  getDetailDataServiceUpdateSuccess,
  updateDataServiceSuccess,
} from '../actions/create_dataService';
import { UpdateDataSource } from '../actions/create_dataSource';
import { UpdateOperation } from '../actions/create_operation';
import { UpdateQuery } from '../actions/create_query';
import { UpdateResource } from '../actions/create_resource';
import { CreateDataServiceAction, CreateDataSourceAction } from '../models';
import {
  checkingConnection,
  createDataService,
  getDetailDataServiceUpdate,
  updateDataServiceApi,
} from '../service/api';

/**
 *
 * @param action checking connection
 */
export function* createDataSourceAsync(action: CreateDataSourceAction) {
  try {
    const rs = yield checkingConnection(action.params);

    if (rs.code === 0) {
      NotificationSuccess('Thành công', `Xác nhận kết nối tới ${action.params?.port}`);
    } else {
      NotificationError('Thất bại', `Không thể kết nối tới  ${action.params?.port} ${rs.message}`);
    }
  } catch (e) {
    NotificationError('Thất bại', `Không thể kết nối tới ${action.params?.port} ${e.message}`);
  }
}

export function* createDataServiceAsync(action: CreateDataServiceAction) {
  try {
    const history = action.history;
    const rs = yield createDataService(action.params);
    if (rs.code === 0) {
      yield put(createDataServiceSuccess(rs.item));
      NotificationSuccess('Thành công', `Tạo mới dịch vụ dữ liệu thành công`);

      history.replace(`/manager-data-services/manager-data-services/${rs.item}`);
    } else {
      NotificationError('Thất bại', rs.message);
      yield put(createDataServiceError(new AppError(rs.message)));
    }
  } catch (e) {
    yield put(createDataServiceError(new AppError(e.message)));
    NotificationError('Thất bại', e.message);
  }
}

export function* getDetailDataServiceUpdateSaga(action: CreateDataServiceAction) {
  try {
    const rs = yield getDetailDataServiceUpdate(action.id);
    yield put(getDetailDataServiceUpdateSuccess(rs));
    yield put(UpdateDataSource(rs.dataSources));
    yield put(UpdateOperation(rs.operationEntities));
    yield put(UpdateQuery(rs.queryEntities));
    yield put(UpdateResource(rs.resourceEntities));
  } catch (e) {
    yield put(getDetailDataServiceUpdateError(new AppError(e.message)));
  }
}

export function* updateDataServiceAsync(action: CreateDataServiceAction) {
  try {
    const history = action.history;
    console.log(history);
    const rs = yield updateDataServiceApi(action.params);

    if (rs.code === 0) {
      NotificationSuccess('Thành công', `Cập nhật dịch vụ dữ liệu thành công`);
      history.replace(`/manager-data-services/manager-data-services/${action.params?.id}`);
      yield put(updateDataServiceSuccess());
    } else {
      yield put(createDataServiceError(new AppError(rs.message)));
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createDataServiceError(new AppError(e.message)));
    NotificationError('Thất bại', e.message);
  }
}
