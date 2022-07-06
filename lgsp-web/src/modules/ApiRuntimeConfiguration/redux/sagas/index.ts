import {all, takeLatest} from "redux-saga/effects";
import {updateApiRuntimeConfigurationAsync} from "./update_runtime_configuration";
import {UPDATE_API_RUNTIME_CONFIGURATION} from "../constants";

export default function* root(){
  return all([
    yield takeLatest(UPDATE_API_RUNTIME_CONFIGURATION, updateApiRuntimeConfigurationAsync)
  ]);
}
