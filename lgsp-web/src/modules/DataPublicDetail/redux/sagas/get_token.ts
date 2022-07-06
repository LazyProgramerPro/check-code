import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getTokenErrors, getTokenSuccess } from '../actions/get_token';
import { token } from '../service/apis';

export function* getTokenAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield token(action.params);
    yield put(getTokenSuccess(datas));
  } catch (error) {
    yield put(getTokenErrors(error));
  }
}
