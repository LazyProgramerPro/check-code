import {all, takeLatest} from 'redux-saga/effects';
import {
  CHECKING_CONNECTION,
  CREATE_DATA_SERVICE,
  GET_DETAIL_DATA_SERVICE_UPDATE,
  UPDATE_DATA_SERVICE,
} from '../constant';
import {
  createDataServiceAsync,
  createDataSourceAsync,
  getDetailDataServiceUpdateSaga,
  updateDataServiceAsync,
} from './create_dataService';

export default function* root() {
  return all([
    yield takeLatest(CHECKING_CONNECTION, createDataSourceAsync),
    yield takeLatest(CREATE_DATA_SERVICE, createDataServiceAsync),
    yield takeLatest(GET_DETAIL_DATA_SERVICE_UPDATE, getDetailDataServiceUpdateSaga),
    yield takeLatest(UPDATE_DATA_SERVICE, updateDataServiceAsync),
  ]);
}
