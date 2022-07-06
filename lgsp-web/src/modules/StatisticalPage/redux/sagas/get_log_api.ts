import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getLogApiSuccess, getLogApiErrors } from '../actions/get_log_api';
import { searchLogApi } from '../services/apis';
export function* getLogApiAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield searchLogApi(action.params);
    yield put(getLogApiSuccess(datas));
  } catch (error) {
    yield put(getLogApiErrors(error));
  }
}
