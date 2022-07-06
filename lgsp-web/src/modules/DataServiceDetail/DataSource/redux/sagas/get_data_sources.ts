import {put} from "redux-saga/effects";
import {searchDataSource} from "../service/apis";
import {GetDataSourceAction} from "../models";
import {getAllDataSourceError, getAllDataSourceSuccess} from "../actions/get_data_sources";
import {ListResponseBase} from "../../../../../models/baseResponse";
import {DataServiceEntity} from "../../../../DataService/redux/models";
import {GET} from "../../../../../services";


export function* getAllDataSourceAsync(action: GetDataSourceAction){
  try {
    const rs = yield searchDataSource(action.params);
    yield put(getAllDataSourceSuccess(rs));
  }catch (error){
    yield put(getAllDataSourceError(error));
  }
}


