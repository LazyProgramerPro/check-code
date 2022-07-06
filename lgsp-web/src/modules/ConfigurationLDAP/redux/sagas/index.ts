import { all, takeLatest } from 'redux-saga/effects';
import { DETAIL_DATA, GET_DATA } from '../constanst';
import { detailAsyns } from './detail_data';
import { getDataAsync } from './get_data';

export default function* root() {
  return all([
    yield takeLatest(GET_DATA, getDataAsync), 
    yield takeLatest(DETAIL_DATA,detailAsyns),
  ]);
}
