import {put} from "redux-saga/effects";
import {GetQueryDetailAction} from "../models";
import {getQueryDetail} from "../services/apis";
import {getQueryDetailError, getQueryDetailSuccess} from "../actions/get_query_detail";


export function* getQueryDetailAsync(action: GetQueryDetailAction){
  try {
    if(action.queryId !== undefined){
      const rs = yield getQueryDetail(action.queryId);
      yield put(getQueryDetailSuccess(rs));
    }
  }catch (error){
    yield put(getQueryDetailError(error));
  }
}
