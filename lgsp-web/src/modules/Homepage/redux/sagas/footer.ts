import {getContentFooterPageError, getContentFooterPageSuccess} from '../actions';
import {AppError} from '../../../../models/common';
import {all, call, fork, put, take} from "redux-saga/effects";
import {IFooterAction} from "../models";
import {GET_CONTENT_FOOTER_PAGE} from '../constants';
import {getContentFooterService} from '../services';

function* getContentFooterAsync() {
  try {
    while (true) {
      const action: IFooterAction = yield take(GET_CONTENT_FOOTER_PAGE);
      const response = yield call(getContentFooterService, action.params);
      if (response.code === 0) {
        const {payload} = response;
        yield put(getContentFooterPageSuccess(payload));
      } else {
        yield put(getContentFooterPageError({code: response.code, message: response.message} as AppError));
      }
    }
  } catch (error) {
    yield put(getContentFooterPageError({code: 0, message: "error from server"} as AppError));
  }
}

export default function* watchFooterSaga() {
  yield all([
    yield fork(getContentFooterAsync),
  ]);
}
