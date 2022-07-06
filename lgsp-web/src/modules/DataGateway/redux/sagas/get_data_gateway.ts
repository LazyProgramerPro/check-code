import { put } from '@redux-saga/core/effects';
import { ActionBase } from 'src/models/common';
import { getDataGatewayErrors, getDataGatewaySuccess } from '../actions/get_data_gateway';
import { dataGateway } from '../service/apis';
export function* getDataGateway(action: ActionBase<{}>) {
  try {
    const datas = yield dataGateway(action.params);
    yield put(getDataGatewaySuccess(datas));
  } catch (error) {
    yield put(getDataGatewayErrors(error));
  }
}
