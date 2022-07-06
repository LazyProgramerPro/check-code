import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { resource } from '../service/apis';
import { getResourceSuccess, getResourceErrors } from '../actions/get_resource';
export function* getResource(action: ActionBase<{}>) {
  try {
    const datas = yield resource(action.params);
    yield put(getResourceSuccess(datas));
  } catch (error) {
    yield put(getResourceErrors(error));
  }
}
