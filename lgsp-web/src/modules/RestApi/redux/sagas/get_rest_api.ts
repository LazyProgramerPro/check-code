import {put} from "redux-saga/effects";
import {GetRestApiAction} from "../models";
import {searchRestApi} from "../services/apis";
import {getAllRestApiError, getAllRestApiSuccess} from "../actions/get_rest_api";


export function* getAllRestApiAsync(action: GetRestApiAction){
  try {
    const rs = yield searchRestApi(action.params);
    yield put(getAllRestApiSuccess(rs));
  }catch (error){
    yield put(getAllRestApiError(error));
  }
}
