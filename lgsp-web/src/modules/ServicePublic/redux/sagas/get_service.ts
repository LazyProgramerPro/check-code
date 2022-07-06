import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getServiceErrors, getServiceSuccess } from '../actions/get_service';
import { searchService } from '../services/apis';

export function* getServiceAsync(action: ActionBase<{}>) {
  try {
    const datas = yield searchService(action.params);
    yield put(getServiceSuccess(datas));
  } catch (error) {
    yield put(getServiceErrors(error));
  }
}
