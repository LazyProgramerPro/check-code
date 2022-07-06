import {
  GetApiPolicyState,
  GetApiSubscriptionUserState,
  UpdateApiPolicyState,
  UpdateApiPolicySubscriptionState
} from "../models";
import {combineReducers} from "redux";
import getPolicyState from "./get_api_policy"
import updatePolicyState from "./update_api_policy"
import getApiSubscriptionUserState from "./get_api_subscription_user"
import updateApiSubscriptionUserState from "./update_api_subscription";

export interface ApiBusinessPlanModuleState{
  getPolicyState: GetApiPolicyState,
  updatePolicyState: UpdateApiPolicyState,
  getApiSubscriptionUserState: GetApiSubscriptionUserState,
  updateApiSubscriptionUserState: UpdateApiPolicySubscriptionState
}

export default combineReducers<ApiBusinessPlanModuleState> ({
  getPolicyState: getPolicyState,
  updatePolicyState: updatePolicyState,
  getApiSubscriptionUserState: getApiSubscriptionUserState,
  updateApiSubscriptionUserState: updateApiSubscriptionUserState
})
