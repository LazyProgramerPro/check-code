import { put } from 'redux-saga/effects';
import { CreateCachingAction } from '../models';
import { createCaching } from '../services/apis';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { createCachingError, createCachingSuccess, showCreateCachingForm } from '../actions/create_caching';
import { reloadData } from '../actions/get_caching';
import { AppError } from '../../../../models/common';
export function* createCachingAsyns(action: CreateCachingAction) {
  try {
    const rs = yield createCaching(action.params);
    yield put(createCachingSuccess());
    yield put(showCreateCachingForm(false));
    yield put(reloadData());
    if (rs.code == 0) {
      NotificationSuccess('Thành Công', 'Cập nhật thời gian refresh caching thành công ');
    }
  } catch (e) {
    yield put(createCachingError(new AppError(e.message)));
  }
}
