import {GetQueryAction} from "../../../Query/redux/models";
import {put} from "redux-saga/effects";
import {getAllQueryError, getAllQuerySuccess} from "../actions/get_query";
import {searchQuery} from "../services/apis";

export function* getAllQueryAsync(action: GetQueryAction){
  try {
    const rs = yield searchQuery(action.params);
    yield put(getAllQuerySuccess(rs));
  }catch (error){
    yield put(getAllQueryError(error));
  }
}
