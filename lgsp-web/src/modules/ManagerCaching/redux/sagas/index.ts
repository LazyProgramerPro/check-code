import { all, takeLatest } from 'redux-saga/effects';
import { CREATE_CACHING, GET_CACHING } from '../constants';
import { getCachingAsync } from './get_caching';
import { createCachingAsyns } from './create_caching';
export default function* root() {
  return all([yield takeLatest(GET_CACHING, getCachingAsync), yield takeLatest(CREATE_CACHING, createCachingAsyns)]);
}
