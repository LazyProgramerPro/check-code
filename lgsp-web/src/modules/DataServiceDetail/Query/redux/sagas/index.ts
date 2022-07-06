import {all, takeLatest} from "redux-saga/effects";
import {GET_ALL_QUERY, SHOW_QUERY_DETAIL} from "../constants";
import {getAllQueryAsync} from "./get_query";
import {getQueryDetailAsync} from "./get_query_detail";

export default function* root(){
  return all([
    yield takeLatest(GET_ALL_QUERY, getAllQueryAsync),
    yield takeLatest(SHOW_QUERY_DETAIL, getQueryDetailAsync),
  ]);
}
