import {put} from "redux-saga/effects";
import {GetDataServiceAction} from "../models";
import {searchDataService} from "../service/apis";
import {getAllDataServiceError, getAllDataServiceSuccess} from "../actions/get_data_services";


export function* getAllDataServiceAsync(action: GetDataServiceAction){
  try {
    const rs = yield searchDataService(action.params);
    yield put(getAllDataServiceSuccess(rs));
  }catch (error){
    yield put(getAllDataServiceError(error));
  }
}
