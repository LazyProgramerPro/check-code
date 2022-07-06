import { CreateGroupRestApiAction } from '../models';
import { createGroupRestAPI, createGroupWsdlFileAPI } from '../services/apis';
import { put } from 'redux-saga/effects';
import { createGroupRestApiError, createGroupRestApiSuccess, reloadData } from '../actions/group_api';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/baseResponse';
import { showCreatApiForm } from '../actions/create_api';
import { E_REST_API_TYPE } from '../../../../constants/common';

export function* createGroupRestApiAsync2(action: CreateGroupRestApiAction) {
  try {
    let rs;
    if (action.params?.apiType === E_REST_API_TYPE.REST) {
      rs = yield createGroupRestAPI(action.params);
    } else if (
      action.params?.apiType === E_REST_API_TYPE.SOAP ||
      action.params?.apiType === E_REST_API_TYPE.SOAP2REST
    ) {
      const formData = new FormData();
      formData.append('file', action.params?.file || '');
      formData.append('type', action.params?.apiType);
      formData.append('name', action.params.name);
      formData.append('context', action.params.context);
      formData.append('version', action.params.version);
      formData.append('wsdlUrl', action.params.wsdlUrl || '');
      formData.append('levelDeployment', action.params.deploymentLevel);
      formData.append('endpointUrl', action.params.endpointUrl);
      rs = yield createGroupWsdlFileAPI(formData);
    } else {
      yield put(showCreatApiForm(false));
      return;
    }
    yield put(createGroupRestApiSuccess());
    if (rs.code == 0) {
      yield put(showCreatApiForm(false));
      NotificationSuccess('Thành công', 'Tạo mới dịch vụ chia sẻ thành công');
      const history = action.history;
      // yield put(reloadData());
      history.replace(`group-api-config/${rs.item}`);
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createGroupRestApiError(new AppError(e.message)));
    NotificationError('Thất bại', 'Xảy ra lỗi hệ thống');
  }
}
