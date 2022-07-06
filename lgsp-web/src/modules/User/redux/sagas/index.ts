import { all, takeLatest } from 'redux-saga/effects';

import {
  ACCEPT_USERS,
  CLICK_DELETE_USER_BUTTON,
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  REJECT_USERS,
  UPDATE_USER,
} from '../constant';
import { getAllUserAsync } from './get_users';
import { acceptUserAsync, createUserAsync, rejectUserAsync } from './create_user';
import { updateUserAsync } from './update_user';
import { deleteUserAsync } from './delete_user';

export default function* root() {
  return all([
    yield takeLatest(GET_ALL_USERS, getAllUserAsync),
    yield takeLatest(CREATE_USER, createUserAsync),
    yield takeLatest(UPDATE_USER, updateUserAsync),
    yield takeLatest(DELETE_USER, deleteUserAsync),
    yield takeLatest(ACCEPT_USERS, acceptUserAsync),
    yield takeLatest(REJECT_USERS, rejectUserAsync),
  ]);
}
