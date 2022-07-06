import {UpdateApiPolicySubscriptionAction} from "../models";
import {put} from "redux-saga/effects";
import {
  showUpdateSubscriptionForm,
  updateApiPolicySubscriptionError,
  updateApiPolicySubscriptionSuccess
} from "../actions/update_api_subscription";
import {updateApiPolicySubscriptionService} from "../services/apis";
import {reloadApiSubscriptionData} from "../actions/get_api_subscription_user";
import { NotificationError, NotificationSuccess } from "src/components/Notification/Notification";

export function* updateApiPolicySubscriptionAsync(action: UpdateApiPolicySubscriptionAction){
  try {
    const rs = yield updateApiPolicySubscriptionService(action.params);
    yield put(updateApiPolicySubscriptionSuccess(rs));
    yield put(reloadApiSubscriptionData());
    yield put(showUpdateSubscriptionForm(false));
    if(rs.code === 0){
      NotificationSuccess('Thành công', 'Thay đổi giới hạn sử dụng dịch vụ chia sẻ thành công');
    }else {
      NotificationError('Thất bại', rs.message);
    }
  }catch (error){
    yield put(updateApiPolicySubscriptionError(error));
  }
}
