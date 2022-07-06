import { put } from "redux-saga/effects";
import { ActionBase } from "src/models/common";
import { getDriverErrors, getDriverSuccess } from "../actions/get_driver";
import { driver } from "../service/apis";

export function* getDriver(action: ActionBase<{}>) {
  try {
    const datas = yield driver(action.params);
    yield put(getDriverSuccess(datas));
  } catch (error) {
    yield put(getDriverErrors(error));
  }
}
