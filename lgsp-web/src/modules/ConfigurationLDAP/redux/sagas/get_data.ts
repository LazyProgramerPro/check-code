import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getDataErrors, getDataSuccess } from '../actions/get_data';
import { searchData } from '../service/api';

export function* getDataAsync(action: ActionBase<{}>) {
  try {
    const datas = yield searchData(action.params);
    yield put(getDataSuccess(datas));
  } catch (error) {
    yield put(getDataErrors(error));
  }
}
