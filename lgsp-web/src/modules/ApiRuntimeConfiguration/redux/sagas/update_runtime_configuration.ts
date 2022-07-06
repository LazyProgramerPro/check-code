import {updateApiGeneralInformationService} from "../../../ApiGeneralInformation/redux/services/apis";
import {put} from "redux-saga/effects";
import {UpdateApiRuntimeConfigurationAction} from "../models";
import {
  updateApiRuntimeConfigurationError,
  updateApiRuntimeConfigurationSuccess
} from "../actions/update_runtime_configuration";
import {updateApiRuntimeConfigurationService} from "../services/apis";
import {NotificationError, NotificationSuccess} from "../../../../components/Notification/Notification";

export function* updateApiRuntimeConfigurationAsync(action: UpdateApiRuntimeConfigurationAction){
  try {
    const rs = yield updateApiRuntimeConfigurationService(action.params);
    yield put(updateApiRuntimeConfigurationSuccess());
    if(rs.code == 0){
      NotificationSuccess("Thành công", "Cấu hình giới hạn truy cập API thành công")
    }else {
      NotificationError("Thất bại", rs.message)
    }
  }catch (error){
    yield put(updateApiRuntimeConfigurationError(error));
  }
}
