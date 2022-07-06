import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getGeneralErrors, getGeneralSuccess } from '../actions/get_datageneral';
import { general } from '../service/apis';

export function* getDataGeneralAsync (action: ActionBase<{}>) {
  try {
    const datas = yield general(action.params);
    yield put(getGeneralSuccess(datas));
  } catch (error) {
    yield put(getGeneralErrors(error));
  }
}
