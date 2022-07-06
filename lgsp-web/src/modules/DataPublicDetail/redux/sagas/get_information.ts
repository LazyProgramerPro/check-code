import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getInformationErrors, getInformationSuccess } from '../actions/get_information';
import { information } from '../service/apis';

export function* getInformationAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield information(action.params);
    yield put(getInformationSuccess(datas));
  } catch (error) {
    yield put(getInformationErrors(error));
  }
}
