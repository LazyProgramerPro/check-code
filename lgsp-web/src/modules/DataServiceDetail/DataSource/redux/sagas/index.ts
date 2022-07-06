import {all, takeLatest} from "redux-saga/effects";
import {getSingleDataSourceAsync} from "./get_single_data_source";
import {getAllDataSourceAsync} from "./get_data_sources";
import {GET_ALL_DATA_SOURCE, GET_SINGLE_DATA_SOURCE} from "../constants";

export default function* root(){
  return all([
    yield takeLatest(GET_ALL_DATA_SOURCE, getAllDataSourceAsync),
    yield takeLatest(GET_SINGLE_DATA_SOURCE, getSingleDataSourceAsync),
  ]);
}
