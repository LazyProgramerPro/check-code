import { GetRegisterAction } from '../models';
import { put, select } from '@redux-saga/core/effects';
import { information, register } from '../service/apis';
import { getRegisterSuccess, reloadData } from '../actions/get_register';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { getInformation } from '../actions/get_information';
export function* getRegisterAsync(action: GetRegisterAction) {
  try {
    const rs = yield register(action?.param);
    yield put(getRegisterSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Đăng ký dịch vụ chia sẻ thành công');
      const params = yield select((state: RootState) => state.dataPublicDetail.getInformationState.params);
      yield put(getInformation(params));
    } else {
      NotificationError('Thất bại', 'Đăng ký dịch vụ chia sẻ thất bại');
    }
  } catch (error) {}
}
