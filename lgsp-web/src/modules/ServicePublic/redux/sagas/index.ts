import { all, takeLatest } from 'redux-saga/effects';
import { CREATE_SERVICE, DELETE_SERVICE, GET_SERVICE, UPDATE_SERVICE } from '../constants';
import { createServiceAsyns } from './create_service';
import { deleteServiceAsync} from './delete_service'
import { getServiceAsync } from './get_service';
import { updateServiceAsync } from './update_service';
export default function* root() {
  return all([
    yield takeLatest(GET_SERVICE, getServiceAsync), 
    yield takeLatest(CREATE_SERVICE, createServiceAsyns),
    yield takeLatest(DELETE_SERVICE,deleteServiceAsync),
    yield takeLatest(UPDATE_SERVICE, updateServiceAsync)
  ]);
}
