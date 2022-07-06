import { put, select } from 'redux-saga/effects';
import { createContentError, createContentSuccess } from '../actions/create_content';
import { CreateContentAction, InforDetailParams } from '../models';
import { createContent, detailInfor } from '../services/apis';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { AppError } from 'src/models/common';

export function* createContentAsyns(action: CreateContentAction) {
  try {
    const history = action.history;
    const rs = yield createContent(action.params);
    if (rs.code === 0) {
      history.replace(`/system-infor-manager/system-infor-manager/update-infor/${rs.item}`);
      NotificationSuccess('Thành Công', 'Tạo mới thông tin giới thiệu thành công');
      yield put(createContentSuccess());
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(createContentError(new AppError(e.message)));
  }
}
