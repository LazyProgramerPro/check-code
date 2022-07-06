import { all, takeLatest } from '@redux-saga/core/effects';
import { CREATE_GATEWAY, DELETE_GATEWAY, GET_GATEWAY, UPDATE_GATEWAY } from '../constanst';
import { getDataGateway } from './get_data_gateway';
import { deleteGatewayAsync } from './delete_gateway';
import { createGatewayAsyns } from './create_gateway';
import { updateGatewayAsync } from './update_gateway';
export default function* root() {
  return all([
    yield takeLatest(GET_GATEWAY, getDataGateway),
    yield takeLatest(DELETE_GATEWAY, deleteGatewayAsync),
    yield takeLatest(CREATE_GATEWAY, createGatewayAsyns),
    yield takeLatest(UPDATE_GATEWAY, updateGatewayAsync),
  ]);
}
