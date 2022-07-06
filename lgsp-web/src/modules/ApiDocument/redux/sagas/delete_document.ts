import { put } from 'redux-saga/effects';
import { reloadData } from '../actions/get_api_document';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { deleteApiDocumentService } from '../services/apis';
import { DeleteApiDocumentAction } from '../models';
import {
  deleteApiDocumentError,
  deleteApiDocumentSuccess,
  showDeleteApiDocumentConfirm,
} from '../actions/delete_document';

export function* deleteApiDocumentAsync(action: DeleteApiDocumentAction) {
  console.log('saga');
  try {
    const rs = yield deleteApiDocumentService(action?.param);
    yield put(deleteApiDocumentSuccess());
    yield put(showDeleteApiDocumentConfirm(false));
    yield put(reloadData());
    if (rs.code == 0) {
      NotificationSuccess('Thành công', 'Xóa tài liệu hướng dẫn sử dụng dịch vụ chia sẻ thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(deleteApiDocumentError(new AppError(e.message)));
  }
}
