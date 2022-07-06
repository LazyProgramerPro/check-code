import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getSandboxErrors, getSandboxSuccess } from '../actions/get_sandbox';
import { sandbox } from '../service/apis';

export function* getSandboxAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield sandbox(action.params);
    yield put(getSandboxSuccess(datas));
  } catch (error) {
    yield put(getSandboxErrors(error));
  }
}
