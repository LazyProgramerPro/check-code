import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getDataErrors, getDataSuccess } from '../actions/get_data';
import { dataStatiscal } from '../services/apis';

export function* getData(action: ActionBase<{}>) {
  try {
    const datas = yield dataStatiscal(action.params);
    yield put(getDataSuccess(datas));
  } catch (error) {
    yield put(getDataErrors(error));
  }
}
