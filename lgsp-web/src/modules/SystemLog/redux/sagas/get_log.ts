import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getLogSuccess, getLogErrors } from '../actions/get_log';
import { searchLog } from '../services/apis';
export function* getLogAsync(action: ActionBase<{}>) {
  try {
    const datas = yield searchLog(action.params);
    yield put(getLogSuccess(datas));
  } catch (error) {
    yield put(getLogErrors(error));
  }
}
