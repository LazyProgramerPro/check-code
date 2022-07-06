import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getAllDatasErrors, getAllDatasSuccess } from '../action/get_datas';
import { searchDatas } from '../service/apis';

export function* getAllDataAsync(action: ActionBase<{}>) {
  try {
    const datas = yield searchDatas(action.params);
    yield put(getAllDatasSuccess(datas));
  } catch (error) {
    yield put(getAllDatasErrors(error));
  }
}
