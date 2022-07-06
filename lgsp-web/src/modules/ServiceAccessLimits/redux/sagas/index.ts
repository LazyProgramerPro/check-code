import { all, put, select, takeLatest } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import {
  createServiceAccessError,
  createServiceAccessSuccess,
  deleteServicesAccessError,
  deleteServicesAccessSuccess,
  getListServicesAccess,
  getListServicesAccessError,
  getListServicesAccessSuccess,
  getPermissionListAccessLimit,
  getPermissionListAccessLimitError,
  getPermissionListAccessLimitSuccess,
  updateServiceAccessError,
  updateServiceAccessSuccess,
} from '../actions';
import {
  CREATE_SERVICE_ACCESS,
  DELETE_SERVICE_ACCESS,
  GET_LIST_SERVICE_ACCESS,
  GET_PERMISSION_LIST_ACCESS_LIMIT,
  UPDATE_SERVICE_ACCESS,
} from '../constant';
import { GetServiceAccessLimitParams, ServiceAccessLimitAction } from '../models';
import {
  createServiceAccessLimitApi,
  deleteServiceAccessLimitApi,
  getPermissionListApi,
  getServiceAccessLimit,
  updateServiceAccessLimitApi,
} from '../services/api';

function* getServiceAccessLimitAsync(action: ServiceAccessLimitAction) {
  try {
    const res = yield getServiceAccessLimit(action.params);

    yield put(getListServicesAccessSuccess(res));

    if (res.rows.length === 0) {
      if (action.params !== undefined && action.params.page !== undefined) {
        const params = { ...action.params, page: action.params.page - 1 > 0 ? action.params.page - 1 : 1 };
        const res2 = yield getServiceAccessLimit(params);
        yield put(getListServicesAccessSuccess(res2));
      }
    }
  } catch (error) {
    yield put(getListServicesAccessError(error));
  }
}

function* getPermissionListAccessLimitAsync() {
  try {
    const res = yield getPermissionListApi();

    if (res.code === 0) {
      yield put(getPermissionListAccessLimitSuccess(res.rows));
    } else {
      yield put(getPermissionListAccessLimitError(res.message));
    }
  } catch (error) {
    yield put(getPermissionListAccessLimitError(error.message));
  }
}

function* createServiceAccessLimitAsync(action: ServiceAccessLimitAction) {
  try {
    const response = yield createServiceAccessLimitApi(action.paramsCreate);

    if (response.code === 0) {
      yield put(createServiceAccessSuccess());
      NotificationSuccess('Thành công', 'Tạo mới giới hạn truy cập dịch vụ chia sẻ thành công');
      const params = yield select((rootstate: RootState) => rootstate.serviceAccessLimit.servicesAccessLimits.params);
      yield put(getListServicesAccess(params));
    } else {
      yield put(createServiceAccessError(response.message));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(createServiceAccessError(error.message));
  }
}

function* deleteServiceAccessLimitAsync(action: ServiceAccessLimitAction) {
  try {
    const response = yield deleteServiceAccessLimitApi(action.id);

    if (response.code === 0) {
      yield put(deleteServicesAccessSuccess());
      NotificationSuccess('Thành công', 'Xóa giới hạn truy cập dịch vụ chia sẻ thành công');
      const params = yield select((rootstate: RootState) => rootstate.serviceAccessLimit.servicesAccessLimits.params);
      yield put(getListServicesAccess(params));
    } else {
      yield put(deleteServicesAccessError(response.message));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(deleteServicesAccessError(error.message));
  }
}

function* updateServiceAccessLimitAsync(action: ServiceAccessLimitAction) {
  try {
    const response = yield updateServiceAccessLimitApi(action.paramsCreate);

    if (response.code === 0) {
      yield put(updateServiceAccessSuccess());
      NotificationSuccess('Thành công', 'Cập nhật giới hạn truy cập dịch vụ chia sẻ thành công');

      let params: GetServiceAccessLimitParams = {
        page: 1,
        size: 50,
        text: '',
      };

      yield put(getListServicesAccess(params));
    } else {
      yield put(updateServiceAccessError(response.message));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(updateServiceAccessError(error.message));
  }
}

export default function* root() {
  yield all([
    yield takeLatest(GET_LIST_SERVICE_ACCESS, getServiceAccessLimitAsync),
    yield takeLatest(GET_PERMISSION_LIST_ACCESS_LIMIT, getPermissionListAccessLimitAsync),
    yield takeLatest(CREATE_SERVICE_ACCESS, createServiceAccessLimitAsync),
    yield takeLatest(DELETE_SERVICE_ACCESS, deleteServiceAccessLimitAsync),
    yield takeLatest(UPDATE_SERVICE_ACCESS, updateServiceAccessLimitAsync),
  ]);
}
