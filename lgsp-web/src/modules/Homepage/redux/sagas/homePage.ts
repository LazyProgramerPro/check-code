import {getContentHomePageService} from '../services';
import {getContentHomePageError, getContentHomePageSuccess} from '../actions';
import {AppError} from '../../../../models/common';
import {all, call, fork, put, take} from "redux-saga/effects";
import {IHomePageAction} from '../models';
import {GET_CONTENT_HOME_PAGE} from '../constants';

function* getContentHomePageAsync() {
  try {
    while (true) {
      const action: IHomePageAction = yield take(GET_CONTENT_HOME_PAGE);
      const response = yield call(getContentHomePageService, action.params);
      if (response.code === 0) {
        const {payload} = response;
        yield put(getContentHomePageSuccess(payload));
      } else {
        yield put(getContentHomePageError({code: response.code, message: response.message} as AppError));
      }
    }
  } catch (error) {
    yield put(getContentHomePageError({code: 0, message: "error from server"} as AppError));
  }
}

export default function* watchFooterSaga() {
  yield all([
    yield fork(getContentHomePageAsync),
  ]);
}
