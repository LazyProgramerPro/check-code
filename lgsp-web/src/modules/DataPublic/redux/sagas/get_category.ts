import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getCategoryErrors, getCategorySuccess } from '../action/get_category';
import { category } from '../service/apis';

export function* getCategoryAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield category(action.params);
    yield put(getCategorySuccess(datas));
  } catch (error) {
    yield put(getCategoryErrors(error));
  }
}
