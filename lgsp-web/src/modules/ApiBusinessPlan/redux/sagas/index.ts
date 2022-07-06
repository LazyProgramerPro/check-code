import {all, takeLatest} from "redux-saga/effects";
import {getApiPolicyAsync} from "./get_api_policy";
import {
  GET_API_POLICY,
  GET_API_SUBSCRIPTION_USER,
  UPDATE_API_POLICY,
  UPDATE_API_POLICY_SUBSCRIPTION
} from "../constants";
import {updateApiPolicyAsync} from "./update_api_policy";
import {getApiSubscriptionUserAsync} from "./get_api_subscription_user";
import {updateApiPolicySubscriptionAsync} from "./update_api_subscription";


export default function* root(){
  return all([
    yield takeLatest(GET_API_POLICY, getApiPolicyAsync),
    yield takeLatest(UPDATE_API_POLICY, updateApiPolicyAsync),
    yield takeLatest(GET_API_SUBSCRIPTION_USER, getApiSubscriptionUserAsync),
    yield takeLatest(UPDATE_API_POLICY_SUBSCRIPTION, updateApiPolicySubscriptionAsync)
  ]);
}
