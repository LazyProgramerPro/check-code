import { all, takeLatest } from '@redux-saga/core/effects';
import { DELETE_DATA_SERVICE, GET_LIST_DATA_SERVICE } from '../constant';
import { deleteDataServiceAsync } from './delete_dataService';
import { getListDataServicesAsync } from './get_dataService';

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_DATA_SERVICE, getListDataServicesAsync),
    yield takeLatest(DELETE_DATA_SERVICE, deleteDataServiceAsync),
  ]);
}
