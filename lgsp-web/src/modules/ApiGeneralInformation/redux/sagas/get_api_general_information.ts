import {put} from "redux-saga/effects";
import {GetApiGeneralInformationAction} from "../models";
import {getApiGeneralInformationService} from "../services/apis";
import {getApiGeneralInformationError, getApiGeneralInformationSuccess} from "../actions/get_api_general_information";

export function* getApiGeneralInformationAsync(action: GetApiGeneralInformationAction){
  try {
    const rs = yield getApiGeneralInformationService(action.apiId);
    yield put(getApiGeneralInformationSuccess(rs));
  }catch (error){
    yield put(getApiGeneralInformationError(error));
  }
}
