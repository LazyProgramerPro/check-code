import { all, takeLatest } from '@redux-saga/core/effects';
import { GET_RESOURCE, CREATE_RESOURCE, DELETE_DATA_RESOURCE, UPDATE_RESOURCE } from '../constanst';
import { createResourceAsyns } from './create_resource';
import { deleteResourceAsync } from './delete_resource';
import { getResource } from './get_resource';
import { updateResourceAsync } from './update_resource';
export default function* root() {
  return all([
    yield takeLatest(GET_RESOURCE, getResource),
    yield takeLatest(CREATE_RESOURCE, createResourceAsyns),
    yield takeLatest(DELETE_DATA_RESOURCE, deleteResourceAsync),
    yield takeLatest(UPDATE_RESOURCE, updateResourceAsync),
  ]);
}
