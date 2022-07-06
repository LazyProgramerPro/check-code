import {put} from "redux-saga/effects";
import {
  getApiSubscriptionUserError,
  getApiSubscriptionUserSuccess
} from "../actions/get_api_subscription_user";
import {GetApiSubscriptionUserAction} from "../models";
import {getApiSubscriptionUserService} from "../services/apis";

export function* getApiSubscriptionUserAsync(action: GetApiSubscriptionUserAction){
  try {
    const rs = yield getApiSubscriptionUserService(action.params);
    yield put(getApiSubscriptionUserSuccess(rs));
  }catch (error){
    yield put(getApiSubscriptionUserError(error));
  }
}
