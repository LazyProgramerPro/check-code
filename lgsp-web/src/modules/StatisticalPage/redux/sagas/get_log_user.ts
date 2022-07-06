import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getLogUserSuccess, getLogUserErrors } from '../actions/get_log_user';
import { searchLogUser } from '../services/apis';
export function* getLogUserAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield searchLogUser(action.params);
    yield put(getLogUserSuccess(datas));
  } catch (error) {
    yield put(getLogUserErrors(error));
  }
}
