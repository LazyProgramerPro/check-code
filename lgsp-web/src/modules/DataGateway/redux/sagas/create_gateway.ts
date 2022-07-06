import { put, select } from 'redux-saga/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { createGatewayError, createGatewaySuccess, showCreateGatewayForm } from '../actions/create_gateway';
import { getDataGateway, loadPage, reloadData } from '../actions/get_data_gateway';
import { CreateGatewayAction } from '../models';
import { createGateway } from '../service/apis';
export function* createGatewayAsyns(action: CreateGatewayAction) {
  try {
    const rs = yield createGateway(action.params);
    yield put(createGatewaySuccess());
    yield put(showCreateGatewayForm(false));
    yield put(loadPage());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Tạo mới môi trường gateway thành công');
      // const params = yield select((state: RootState) => state.dataGateway.getDataGatewayState.params);
      // yield put(getDataGateway(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {
    yield put(createGatewayError(error));
  }
}
