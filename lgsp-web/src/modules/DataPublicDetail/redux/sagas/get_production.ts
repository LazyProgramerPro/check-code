import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getProductionErrors, getProductionSuccess } from '../actions/get_production';
import { production } from '../service/apis';

export function* getProductionAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield production(action.params);
    yield put(getProductionSuccess(datas));
  } catch (error) {
    yield put(getProductionErrors(error));
  }
}
