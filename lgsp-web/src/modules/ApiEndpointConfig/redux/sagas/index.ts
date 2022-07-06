import {all, takeLatest} from "redux-saga/effects";
import {getApiEndpointConfigurationAsync} from "./get_endpoint_configuration";
import {updateApiEndpointConfigurationAsync} from "./update_endpoint_configuration";
import {CHECK_API_ENDPOINT_CONFIGURATION, GET_API_ENDPOINT_CONFIGURATION, UPDATE_API_ENDPOINT_CONFIGURATION} from "../constants";
import { checkApiEndpointConfigurationAsync } from "./check_endpoint";

export default function* root(){
  return all([
    yield takeLatest(GET_API_ENDPOINT_CONFIGURATION, getApiEndpointConfigurationAsync),
    yield takeLatest(UPDATE_API_ENDPOINT_CONFIGURATION, updateApiEndpointConfigurationAsync),
    yield takeLatest( CHECK_API_ENDPOINT_CONFIGURATION, checkApiEndpointConfigurationAsync)
  ]);
}
