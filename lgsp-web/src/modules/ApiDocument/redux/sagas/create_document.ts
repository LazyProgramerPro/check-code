import { CreateApiDocumentAction } from '../models';
import { put } from 'redux-saga/effects';
import { createApiDocumentService } from '../services/apis';
import {
  createApiDocumentError,
  createApiDocumentSuccess,
  showCreateApiDocumentForm,
} from '../actions/create_documents';
import { reloadData } from '../actions/get_api_document';
import { AppError } from '../../../../models/common';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';

export function* createApiDocumentAsync(action: CreateApiDocumentAction) {
  try {
    const rs = yield createApiDocumentService(action.params);
    if (rs === undefined || rs === null) {
      NotificationError('Thất bại', 'Thêm mới tài liệu thất bại');
      return;
    }
    let code = rs.code;
    if (code === 0) {
      yield put(createApiDocumentSuccess());
      yield put(showCreateApiDocumentForm(false));
      yield put(reloadData());
      NotificationSuccess('Thành công', 'Tạo mới tài liệu hướng dẫn sử dụng dịch vụ chia sẻ thành công');
    } else {
      NotificationError('Thất bại', rs.message);
      yield put(createApiDocumentError(new AppError(rs.message)));
    }
  } catch (e) {
    yield put(createApiDocumentError(new AppError(e.message)));
  }
}
