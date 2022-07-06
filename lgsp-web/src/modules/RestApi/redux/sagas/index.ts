import {all, takeLatest} from "redux-saga/effects";
import {GET_ALL_REST_API, GET_GROUP_REST_API} from "../constants";
import {getAllRestApiAsync} from "./get_rest_api";
import {getGroupRestApiAsync} from "./get_group_rest_api";


export default function* root(){
  return all([
    yield takeLatest(GET_ALL_REST_API, getAllRestApiAsync),
    yield takeLatest(GET_GROUP_REST_API, getGroupRestApiAsync),
  ]);
}
