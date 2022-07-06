import {GetSingleDataSourceAction} from "../models";
import {getSingleDataSourceError, getSingleDataSourceSuccess} from "../actions/get_single_data_source";
import {put} from "redux-saga/effects";
import {getDataSourceDetail} from "../service/apis";

export function* getSingleDataSourceAsync(action: GetSingleDataSourceAction){
  try {
    const rs = yield getDataSourceDetail(action.dataSourceId);
    yield put(getSingleDataSourceSuccess(rs));
  }catch (error){
    yield put(getSingleDataSourceError(error));
  }
}
