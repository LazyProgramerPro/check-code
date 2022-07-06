import {GetApiEndpointConfigurationAction} from "../models";
import {getApiEndpointConfigurationService} from "../services/apis";
import {put} from "redux-saga/effects";
import {
  getApiEndpointConfigurationError,
  getApiEndpointConfigurationSuccess
} from "../actions/get_endpoint_configuration";
;

export function* getApiEndpointConfigurationAsync(action: GetApiEndpointConfigurationAction){
  try {
    const rs = yield getApiEndpointConfigurationService(action.apiId);
    yield put(getApiEndpointConfigurationSuccess(rs));
  }catch (error){
    yield put(getApiEndpointConfigurationError(error));
  }
}
