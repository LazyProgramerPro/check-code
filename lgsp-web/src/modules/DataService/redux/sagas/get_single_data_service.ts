import { put } from 'redux-saga/effects';
import { GetSingleDataServiceAction } from '../models';
import { getSingleDataServiceError, getSingleDataServiceSuccess } from '../actions/get_single_data_service';
import { getDataServiceDetail } from '../service/apis';

export function* getSingleDataServiceAsync(action: GetSingleDataServiceAction) {
  try {
    const rs = yield getDataServiceDetail(action.dataServiceId);
    yield put(getSingleDataServiceSuccess(rs));
  } catch (error) {
    yield put(getSingleDataServiceError(error));
  }
}
