import { put, select } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { deleteGatewaySuccess, reloadData } from '../actions/delete_gateway';
import { DeleteGatewayAction } from '../models';
import { deleteGateway } from '../service/apis';
import { getDataGateway } from '../actions/get_data_gateway';
export function* deleteGatewayAsync(action: DeleteGatewayAction) {
  try {
    const rs = yield deleteGateway(action?.param);
    yield put(deleteGatewaySuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Xóa môi trường gateway thành công');
      const params = yield select((state: RootState) => state.dataGateway.getDataGatewayState.params);
      yield put(getDataGateway(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (error) {}
}
