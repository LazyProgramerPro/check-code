import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getLogDataServiceErrors, getLogDataServiceSuccess } from '../actions/get_log_data_service';
import { searchLogDataService } from '../services/apis';

export function* getLogDataServiceAsyns(action: ActionBase<{}>) {
  try {
    const datas = yield searchLogDataService(action.params);
    yield put(getLogDataServiceSuccess(datas));
  } catch (error) {
    yield put(getLogDataServiceErrors(error));
  }
}
