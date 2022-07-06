import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getCachingErrors, getCachingSuccess } from '../actions/get_caching';
import { searchCaching } from '../services/apis';
export function* getCachingAsync(action: ActionBase<{}>) {
  try {
    const datas = yield searchCaching(action.params);
    yield put(getCachingSuccess(datas));
  } catch (error) {
    yield put(getCachingErrors(error));
  }
}
