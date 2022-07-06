import { all, put, takeLatest } from 'redux-saga/effects';
import { NotificationError } from 'src/components/Notification/Notification';
import { AppError } from 'src/models/common';
import { getDetailDataServiceError, getDetailDataServiceSuccess } from '../actions';
import { GET_DETAIL_DATA_SERVICE } from '../constant';
import { DetailDataServiceAction } from '../models';
import { getDetailDataService } from '../services/api';

function* getDetailDataServiceAsync(action: DetailDataServiceAction) {
  try {
    const rs = yield getDetailDataService(action.id);

    if (rs.code === 0) {
      yield put(getDetailDataServiceSuccess(rs.item));
    } else {
      yield put(getDetailDataServiceError(new AppError(rs.message)));
      NotificationError(`Lấy thông tin chi tiết dịch vụ dữ liệu thất bại`, rs.message);
    }
  } catch (e) {
    yield put(getDetailDataServiceError(new AppError(e.message)));
    NotificationError(`Lấy thông tin chi tiết dịch vụ dữ liệu thất bại`, e.message);
  }
}

export default function* root() {
  yield all([yield takeLatest(GET_DETAIL_DATA_SERVICE, getDetailDataServiceAsync)]);
}
