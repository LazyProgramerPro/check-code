import { GetRegisterAction } from '../models';
import { put, select } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { getInformation } from '../actions/get_information';
import { unregister } from '../service/apis';
import { getUnRegisterSuccess, reloadData } from '../actions/get_unregister';
export function* getUnRegisterAsync(action: GetRegisterAction) {
  try {
    const rs = yield unregister(action?.param);
    yield put(getUnRegisterSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Hủy đăng ký dịch vụ chia sẻ thành công');
      const params = yield select((state: RootState) => state.dataPublicDetail.getInformationState.params);
      yield put(getInformation(params));
    } else {
      NotificationError('Thất bại', 'Hủy đăng ký dịch vụ chia sẻ thất bại');
    }
  } catch (error) {}
}
