import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getTestErrors, getTestSuccess } from '../actions/get_test';
import { test } from '../service/apis';

export function* getTestAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield test(action.params);
    yield put(getTestSuccess(datas));
  } catch (error) {
    yield put(getTestErrors(error));
  }
}
