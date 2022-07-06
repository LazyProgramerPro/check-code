import { call, put, takeLatest, all } from 'redux-saga/effects';
import { chatboxActions as actions } from '.';
import { ChatboxService } from 'services/chatboxService';

function* handleRemoveUpload(action) {
  try {
    const response = yield call(ChatboxService.removeUpload, action.payload);
    yield put(actions.removeUploadImgSuccess(response.data));
  } catch (error) {
    yield put(actions.removeUploadImgFail(error));
  }
}
function* handleGetMessage(action) {
  try {
    const response = yield call(
      ChatboxService.getMessageHistory,
      action.payload,
    );
    if (response.data.rc === 0) {
      yield put(actions.getMessageSuccess(response.data.rows));
      yield put(actions.setTotalMessage(response.data.total));
    }
  } catch (error) {
    yield put(actions.getMessageFail(error));
  }
}

function* watchRemoveUpload() {
  yield takeLatest(actions.removeUploadImgRequest, handleRemoveUpload);
}
function* watchGetMessage() {
  yield takeLatest(actions.getMessageRequest, handleGetMessage);
}
export function* chatboxSaga() {
  yield all([watchRemoveUpload(), watchGetMessage()]);
}
