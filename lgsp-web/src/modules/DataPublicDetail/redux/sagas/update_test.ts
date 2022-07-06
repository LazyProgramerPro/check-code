import { UpdateTestAction } from '../models';
import { put, select } from 'redux-saga/effects';
import { updateTestSuccess } from '../actions/update_test';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { updateTest } from '../service/apis';
import { getTest, reloadData } from '../actions/get_test';

export function* updateTestAsync(action: UpdateTestAction) {
  try {
    const rs = yield updateTest(action.params);
    yield put(updateTestSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Lưu thông tin cấu hình thành công');
      const params = yield select((state: RootState) => state.dataPublicDetail.getProductionState.params);
      yield put(getTest(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    // yield put(updateProductionError(new AppError(e.message)));
  }
}
