import { all, takeLatest } from 'redux-saga/effects';
import {
  CREATE_CONTENT,
  DELETE_INFOR,
  DETAIL_INFOR,
  GET_SYSTEM_INTRO,
  PUBLIC_INFOR,
  UPDATE_CONTENT,
} from '../constants';
import { createContentAsyns } from './create_content';
import { deleteInforAsync } from './delete_infor';
import { detailAsyns } from './detail';
import { getSystemInfo } from './get_systeminfo';
import { publicAsync } from './public_infor';
import { updateContentAsync } from './update_content';

export default function* root() {
  return all([
    yield takeLatest(GET_SYSTEM_INTRO, getSystemInfo),
    yield takeLatest(UPDATE_CONTENT, updateContentAsync),
    yield takeLatest(CREATE_CONTENT, createContentAsyns),
    yield takeLatest(DELETE_INFOR, deleteInforAsync),
    yield takeLatest(DETAIL_INFOR, detailAsyns),
    yield takeLatest(PUBLIC_INFOR, publicAsync),
  ]);
}
