import { all, takeLatest } from "redux-saga/effects";
import {getDataGeneralAsync} from './get_datageneral';
import {DATA_GENERAL} from '../constanst'
export default function* root() {
  return all([
    yield takeLatest(DATA_GENERAL, getDataGeneralAsync ),
  ])
}
