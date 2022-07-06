import { getGroupApiDetailError, getGroupApiDetailSuccess } from './../actions/index';
import { getGroupApiDetailService } from './../services/index';
import { GET_GROUP_API_DETAIL } from './../constants';
import { AppError } from '../../../../models/common';
import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { hideModal } from 'src/modules/Modal/redux/actions';
import { NotificationSuccess, NotificationError } from 'src/components/Notification/Notification';
import { IGroupApiDetailAction, IGroupApiDetailResponse } from '../models';

function* getGroupApiDetailAsync() {
  try {
    while (true) {
      const action: IGroupApiDetailAction = yield take(GET_GROUP_API_DETAIL);
      const {groupId} = action;
      const response: IGroupApiDetailResponse = yield call(getGroupApiDetailService, groupId as string);

      if (response.code === 0) {
        yield put(getGroupApiDetailSuccess(response?.item));
      } else {
        yield put(getGroupApiDetailError({ code: response.code, message: response?.message } as AppError));
      }
    }
  } catch (error) {
    yield put(getGroupApiDetailError({ error: { code: 0, message: "error from server" } } as any));
  }
}


export default function* watchGroupApiDetailSaga() {
  yield all([
    yield fork(getGroupApiDetailAsync)
  ])
}
