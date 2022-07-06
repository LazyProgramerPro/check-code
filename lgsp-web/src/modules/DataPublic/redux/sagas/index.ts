import { all, takeLatest } from 'redux-saga/effects';
import { GET_ALL_DATAS, GET_CATEGORY, GET_ORGANIZATION } from '../constant';
import { getCategoryAsyns } from './get_category';
import { getAllDataAsync } from './get_datas';
import { getAllOrganizationAsync } from './get_organization';

export default function* root() {
  return all([
    yield takeLatest(GET_ALL_DATAS, getAllDataAsync),
    yield takeLatest(GET_ORGANIZATION, getAllOrganizationAsync),
    yield takeLatest(GET_CATEGORY, getCategoryAsyns),
  ]);
}
