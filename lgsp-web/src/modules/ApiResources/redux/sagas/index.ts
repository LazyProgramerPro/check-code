import {all, takeLatest} from "redux-saga/effects";
import {UPDATE_API_RESOURCE} from "../constants";
import {updateApiResourceAsync} from "./update_api_resource";

export default function* root(){
  return all([
      yield takeLatest(UPDATE_API_RESOURCE, updateApiResourceAsync)
  ]);
}

