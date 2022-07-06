import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { detailDataErrors, detailDataSuccess } from '../actions/detail_data';
import { detailData } from '../service/api';

export function* detailAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield detailData(action.params);
    yield put(detailDataSuccess(datas));
  } catch (error) {
    yield put(detailDataErrors(error));
  }
}
