import { all, takeLatest } from 'redux-saga/effects';
import { GET_ACCOUNT, GET_ID, LOG_API, LOG_CONNECTION, LOG_DATA, LOG_DATA_SERVICE, LOG_USER } from '../constants';
import { getAccountAsyns } from './get_account';
import { getLogConnectionAsyns } from './get_connection';
import { getData } from './get_data';
import { getIdAsyns } from './get_id';
import { getLogApiAsyns } from './get_log_api';
import { getLogDataServiceAsyns } from './get_log_data_service';
import { getLogUserAsyns } from './get_log_user';

export default function* root() {
  return all([
    yield takeLatest(LOG_USER, getLogUserAsyns),
    // yield takeLatest(LOG_DATA_SERVICE, getLogDataServiceAsyns),
    // yield takeLatest(LOG_API, getLogApiAsyns),
    yield takeLatest(LOG_CONNECTION, getLogConnectionAsyns),
    yield takeLatest(LOG_DATA, getData),
    yield takeLatest(GET_ACCOUNT, getAccountAsyns),
    yield takeLatest(GET_ID, getIdAsyns),
  ]);
}
