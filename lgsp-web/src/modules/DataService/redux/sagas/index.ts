import { all, takeLatest } from 'redux-saga/effects';
import { GET_ALL_DATA_SERVICE, GET_APPROVE, GET_SINGLE_DATA_SERVICE, REQUEST_REJECT } from '../constants';
import { getAllDataServiceAsync } from './get_data_services';
import { getSingleDataServiceAsync } from './get_single_data_service';
import { statusServiceAsync } from './get_status_data_service';
import { statusRejectAsync } from './get_status_reject';

export default function* root() {
  return all([
    yield takeLatest(GET_ALL_DATA_SERVICE, getAllDataServiceAsync),
    yield takeLatest(GET_SINGLE_DATA_SERVICE, getSingleDataServiceAsync),
    yield takeLatest(GET_APPROVE, statusServiceAsync),
    yield takeLatest(REQUEST_REJECT, statusRejectAsync),
  ]);
}
