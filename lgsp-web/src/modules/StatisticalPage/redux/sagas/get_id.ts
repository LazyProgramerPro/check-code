import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getIdErrors, getIdSuccess } from '../actions/get_id';
import { getId } from '../services/apis';

export function* getIdAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield getId(action.params);
    yield put(getIdSuccess(datas));
  } catch (error) {
    yield put(getIdErrors(error));
  }
}
