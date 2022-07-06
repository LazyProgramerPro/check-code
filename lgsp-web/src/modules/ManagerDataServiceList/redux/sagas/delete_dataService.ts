import { put, select } from '@redux-saga/core/effects';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import { deleteDataServiceSuccess, reloadData } from '../action/delete_dataService';
import { getListDataServices } from '../action/get_dataSerivices';
import { DeleteDataServiceAction } from '../models';
import { deleteDataService } from '../service/api';

export function* deleteDataServiceAsync(action: DeleteDataServiceAction) {
  try {
    const rs = yield deleteDataService(action?.param);
    yield put(deleteDataServiceSuccess());

    if (rs.code === 0) {
      NotificationSuccess('Thành công', 'Xóa dịch vụ dữ liệu thành công');
      const param = yield select((state: RootState) => state.listDataService.getState.params);
      yield put(getListDataServices(param));
    } else {
      NotificationError('Thất bại', rs.rd);
    }
  } catch (error) {}
}
