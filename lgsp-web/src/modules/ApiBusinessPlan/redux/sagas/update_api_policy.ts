import {put} from "redux-saga/effects";
import {UpdateApiPolicyAction} from "../models";
import {updateApiPolicyService} from "../services/apis";
import {updateApiPolicyError, updateApiPolicySuccess} from "../actions/update_api_policy";
import {NotificationSuccess} from "../../../../components/Notification/Notification";
import {NotificationError} from "../../../../components/Notification/Notification";

export function* updateApiPolicyAsync(action: UpdateApiPolicyAction){
  try {
    const rs = yield updateApiPolicyService(action.params);
    yield put(updateApiPolicySuccess(rs));
    if(rs.code === 0){
      NotificationSuccess('Thành công', 'Thay đổi giới hạn sử dụng dịch vụ chia sẻ thành công');
    }else {
      NotificationError('Thất bại', rs.message);
    }
  }catch (error){
    yield put(updateApiPolicyError(error));
  }
}
