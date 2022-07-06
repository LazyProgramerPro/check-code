import {GetApiPolicyAction} from "../models";
import {put} from "redux-saga/effects";
import {
  getApiPolicyError,
  getApiPolicySuccess
} from "../actions/get_api_policy";
import {getApiPolicyService} from "../services/apis";

export function* getApiPolicyAsync(action: GetApiPolicyAction){
  try {
    const rs = yield getApiPolicyService(action.apiId);
    yield put(getApiPolicySuccess(rs));
  }catch (error){
    yield put(getApiPolicyError(error));
  }
}
