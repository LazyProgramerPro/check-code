import { all, put, takeLatest } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import {
  createTaskError,
  createTaskSuccess,
  getListDataServiceError,
  getListDataServiceSuccess,
  getListOperationError,
  getListOperationSuccess,
  getListTaskError,
  getListTaskSuccess,
  loadPage,
} from '../actions/task';
import { CREATE_TASK, GET_LIST_DATA_SERVICE_TASK, GET_LIST_OPERATION, GET_LIST_TASK } from '../constant';
import { TaskAction } from '../models';
import { createTaskApi, getListDataServiceApi, getListOperationApi, getListTaskApi } from '../service/api';

export function* getListTaskAsync(action: TaskAction) {
  try {
    const res = yield getListTaskApi(action.paramsGetList);
    yield put(getListTaskSuccess(res.rows));
  } catch (error) {
    yield put(getListTaskError(error));
  }
}

export function* getListDataServiceAsync(action: TaskAction) {
  try {
    const res = yield getListDataServiceApi(action.paramsGetList);
    yield put(getListDataServiceSuccess(res.rows));
  } catch (error) {
    yield put(getListDataServiceError(error));
  }
}

export function* getListOperationAsync(action: TaskAction) {
  try {
    const res = yield getListOperationApi(action.dataServiceId);
    yield put(getListOperationSuccess(res.rows));
  } catch (error) {
    yield put(getListOperationError(error));
  }
}

function* createTaskAsync(action: TaskAction) {
  try {
    const response = yield createTaskApi(action.paramCreate);
    yield put(createTaskSuccess());
    yield put(loadPage());
    if (response.code === 0) {
      NotificationSuccess('Thành công', 'Tạo mới tác vụ thành công');
    } else {
      yield put(createTaskError(response.message));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(createTaskError(error.message));
  }
}

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_TASK, getListTaskAsync),
    yield takeLatest(GET_LIST_DATA_SERVICE_TASK, getListDataServiceAsync),
    yield takeLatest(GET_LIST_OPERATION, getListOperationAsync),
    yield takeLatest(CREATE_TASK, createTaskAsync),
  ]);
}
