import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { detailInforErrors, detailInforSuccess } from '../actions/detail';
import { detailInfor } from '../services/apis';

export function* detailAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield detailInfor(action.params);
    yield put(detailInforSuccess(datas));
  } catch (error) {
    yield put(detailInforErrors(error));
  }
}
