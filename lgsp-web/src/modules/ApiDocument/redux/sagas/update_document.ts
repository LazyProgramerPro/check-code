import { put } from 'redux-saga/effects';
import { reloadData } from '../actions/get_api_document';
import { NotificationError, NotificationSuccess } from '../../../../components/Notification/Notification';
import { AppError } from '../../../../models/common';
import { UpdateApiDocumentAction } from '../models';
import { updateApiDocumentService } from '../services/apis';
import { createApiDocumentSuccess, showCreateApiDocumentForm } from '../actions/create_documents';
import {
  showUpdateApiDocumentForm,
  updateApiDocumentError,
  updateApiDocumentSuccess,
} from '../actions/update_document';

export function* updateApiDocumentAsync(action: UpdateApiDocumentAction) {
  try {
    const rs = yield updateApiDocumentService(action.params);
    yield put(updateApiDocumentSuccess());
    yield put(showUpdateApiDocumentForm(false));
    yield put(reloadData());
    if (rs.code == 0) {
      NotificationSuccess('Thành công', 'Cập nhật tài liệu hướng dẫn sử dụng dịch vụ chia sẻ thành công');
    } else {
      NotificationError('Thất bại', rs.message);
    }
  } catch (e) {
    yield put(updateApiDocumentError(new AppError(e.message)));
  }
}
