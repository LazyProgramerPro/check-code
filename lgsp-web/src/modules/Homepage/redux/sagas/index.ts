import {all} from "redux-saga/effects";
import watchFooterSaga from './footer';
import watchHomePageSaga from "./homePage"

export default function* root() {
  yield all([
    watchFooterSaga(),
    watchHomePageSaga()
  ]);
}
