import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getRSystemInfoErrors, getSystemInfoSuccess } from '../actions/get_systeminfo';
import { systemInfor } from '../services/apis';

export function* getSystemInfo(action: ActionBase<{}>) {
  try {
    const datas = yield systemInfor(action.params);
    yield put(getSystemInfoSuccess(datas));
  } catch (error) {
    yield put(getRSystemInfoErrors(error));
  }
}
