import {all} from "redux-saga/effects";
import watchGroupApiSaga from "./group_api";

export default function* root(){  
  yield all([
    watchGroupApiSaga()
  ]);
}
