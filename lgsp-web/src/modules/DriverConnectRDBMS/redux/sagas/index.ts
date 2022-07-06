import { all, takeLatest } from '@redux-saga/core/effects';
import { CREATE_DRIVER, DELETE_DATA_DRIVER, GET_DATA_DRIVER, UPDATE_DRIVER } from '../constanst';
import { createDriverAsyns } from './create_driver';
import { deleteDriverAsync } from './delete_driver';
import { getDriver } from './get_driver';
import { updateDriverAsync } from './update_driver';

export default function* root() {
  return all([
    yield takeLatest(GET_DATA_DRIVER, getDriver),
    yield takeLatest(CREATE_DRIVER, createDriverAsyns),
    yield takeLatest(DELETE_DATA_DRIVER, deleteDriverAsync),
    yield takeLatest(UPDATE_DRIVER, updateDriverAsync),
  ]);
}
