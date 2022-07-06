import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getListDataServicesError, getListDataServicesSuccess } from '../action/get_dataSerivices';
import { getListDataService } from '../service/api';

export function* getListDataServicesAsync(action: ActionBase<{}>) {
  try {
    const listDataService = yield getListDataService(action.params);
    if (listDataService.code === 0) {
      if (listDataService.rows.length === 0) {
        const rs = yield getListDataService({ ...action.params, page: action.params.page - 1 });
        yield put(getListDataServicesSuccess(rs));
      }
      yield put(getListDataServicesSuccess(listDataService));
    }
  } catch (error) {
    yield put(getListDataServicesError(error));
  }
}
