import { all, takeLatest } from 'redux-saga/effects';
import { GET_LOG } from '../constants';
import { getLogAsync } from './get_log';
export default function* root() {
  return all([yield takeLatest(GET_LOG, getLogAsync)]);
}
