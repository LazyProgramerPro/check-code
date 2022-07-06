import {all, takeLatest} from "redux-saga/effects";
import {GET_API_GENERAL_INFORMATION, UPDATE_API_GENERAL_INFORMATION} from "../constants";
import {getApiGeneralInformationAsync} from "./get_api_general_information";
import {updateApiGeneralInformationAsync} from "./update_general_information";

export default function* root(){
  return all([
    yield takeLatest(GET_API_GENERAL_INFORMATION, getApiGeneralInformationAsync),
    yield takeLatest(UPDATE_API_GENERAL_INFORMATION, updateApiGeneralInformationAsync)
  ]);
}
