import { DELETE_GROUP_REST_API } from '../constants';
import { CREATE_WSDL_FILE_API } from '../constants';
import { createWsdlFileApiError, createWsdlFileApiSuccess, deleteGroupApiSuccess } from '../actions/group_api';
import { createGroupApiNewVersion, createGroupWsdlFileAPI, deleteGroupAPI } from '../services/apis';
import { AppError } from '../../../../models/common';
import {
  getAllGroupRestApiError,
  getAllGroupRestApiSuccess,
  createGroupRestApiSuccess,
  createGroupRestApiError,
  reloadData,
} from '../actions/group_api';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { createGroupRestAPI, searchGroupRestApi } from '../services/apis';
import { GetGroupRestApiAction, IGroupApiAction, IRestApiObject } from '../models';
import { GET_ALL_GROUP_REST_API, CREATE_GROUP_REST_API } from '../constants';
import { hideModal } from 'src/modules/Modal/redux/actions';
import { NotificationSuccess, NotificationError } from 'src/components/Notification/Notification';
import { act } from 'react-dom/test-utils';
import { createGroupRestApiAsync2 } from './create_api';

function* getAllGroupRestApiAsync() {
  try {
    while (true) {
      const action: GetGroupRestApiAction = yield take(GET_ALL_GROUP_REST_API);
      const response = yield call(searchGroupRestApi, action.params);

      if (response.code === 0) {
        yield put(getAllGroupRestApiSuccess(response));
      } else {
        yield put(getAllGroupRestApiError({ error: response } as any));
      }
    }
  } catch (error) {
    yield put(getAllGroupRestApiError({ error: { code: 0, message: 'error from server' } } as any));
  }
}

function* createGroupRestApiAsync(action: IGroupApiAction) {
  const payload = action.payload as Partial<IRestApiObject>;
  const callback = action.callback;
  try {
    let response = null;
    if (payload?.id) {
      response = yield call(createGroupApiNewVersion, payload);
    } else {
      response = yield createGroupRestAPI(action.params);
    }
    if (response.code === 0) {
      yield put(createGroupRestApiSuccess());
      yield put(hideModal());
      yield put(reloadData());
      NotificationSuccess('Thành công', 'Tạo mới rest api thành công');
    } else {
      yield put(createGroupRestApiError({ code: response.code, message: response.message } as AppError));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(createGroupRestApiError({ code: 0, message: 'error from server' } as AppError));
    NotificationError('Thất bại', 'Tạo mới rest api thất bại');
  } finally {
    callback && callback();
  }
}

function* createWsdlFileApiAsync(action: IGroupApiAction) {
  const { payload, callback } = action;
  try {
    const response = yield call(createGroupWsdlFileAPI, payload as FormData);
    if (response.code === 0) {
      yield put(createWsdlFileApiSuccess());
      NotificationSuccess('Thành công', 'Tạo mới soap api thành công');
      yield put(hideModal());
      yield put(reloadData());
    } else {
      yield put(createWsdlFileApiError({ code: response.code, message: response.message } as AppError));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(createWsdlFileApiError({ code: 0, message: 'error from server' } as AppError));
    NotificationError('Thất bại', 'Tạo mới soap api thất bại');
  } finally {
    callback && callback();
  }
}

function* deleteGroupApiAsync(action: IGroupApiAction) {
  try {
    const { payload } = action;
    const response = yield call(deleteGroupAPI, payload as Partial<IRestApiObject>);

    if (response.code === 0) {
      yield put(deleteGroupApiSuccess(payload as Partial<IRestApiObject>));
      NotificationSuccess('Thành công', 'Xóa api thành công');
    } else {
      yield put(createWsdlFileApiError({ code: response.code, message: response.message } as AppError));
      NotificationError('Thất bại', response.message);
    }
  } catch (error) {
    yield put(createWsdlFileApiError({ code: 0, message: 'error from server' } as AppError));
    NotificationError('Thất bại', 'Xóa api thất bại');
  }
}

export default function* watchGroupApiSaga() {
  yield all([
    yield fork(getAllGroupRestApiAsync),
    // yield takeLatest(CREATE_GROUP_REST_API, createGroupRestApiAsync),
    yield takeLatest(CREATE_GROUP_REST_API, createGroupRestApiAsync2),
    yield takeLatest(CREATE_WSDL_FILE_API, createWsdlFileApiAsync),
    yield takeLatest(DELETE_GROUP_REST_API, deleteGroupApiAsync),
  ]);
}
