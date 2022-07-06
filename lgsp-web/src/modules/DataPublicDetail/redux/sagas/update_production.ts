import { UpdateProductionAction } from '../models';
import { put, select } from 'redux-saga/effects';
import { updateProduction } from '../service/apis';
import { getProduction, reloadData } from '../actions/get_production';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/store';
import { updateProductionError, updateProductionSuccess } from '../actions/update_production';
export function* updateProductionAsync(action: UpdateProductionAction) {
  try {
    const rs = yield updateProduction(action.params);
    yield put(updateProductionSuccess());
    yield put(reloadData());
    if (rs.code === 0) {
      NotificationSuccess('Thành Công', 'Lưu thông tin cấu hình thành công');
      const params = yield select((state: RootState) => state.dataPublicDetail.getProductionState.params);
      yield put(getProduction(params));
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    // yield put(updateProductionError(new AppError(e.message)));
  }
}
