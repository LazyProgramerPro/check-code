import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getLogConnectionErrors, getLogConnectionSuccess } from '../actions/get_connection';
import { searchConnection } from '../services/apis';
export function* getLogConnectionAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield searchConnection(action.params);
    yield put(getLogConnectionSuccess(datas));
  } catch (error) {
    yield put(getLogConnectionErrors(error));
  }
}
