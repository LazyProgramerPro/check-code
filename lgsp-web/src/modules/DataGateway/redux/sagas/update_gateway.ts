import { put, select } from 'redux-saga/effects';
import { AppError } from '../../../../models/common';
import { UpdateGatewayAction } from '../models';
import { getDataGateway, reloadData } from '../actions/get_data_gateway';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { updateGateway } from '../service/apis';
import { updateGatewaySuccess, updateGatewayError } from '../actions/update_gateway';
export function* updateGatewayAsync(action: UpdateGatewayAction) {
  try {
    const rs = yield updateGateway(action.params);
    yield put(updateGatewaySuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Cập nhật dịch vụ thành công');
      const params = yield select((state: RootState) => state.dataGateway.getDataGatewayState.params);
      yield put(getDataGateway(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateGatewayError(new AppError(e.message)));
  }
}
