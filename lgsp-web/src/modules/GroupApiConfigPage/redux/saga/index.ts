import { all, put, takeLatest } from 'redux-saga/effects';
import { NotificationError } from 'src/components/Notification/Notification';
import { getApiDefinitionError, getApiDefinitionSuccess } from '../actions';
import { GET_API_DEFINITION } from '../constants';
import { ApiDefinitionAction } from '../models';
import { getApiDefinitionService } from '../service/api';

function* getApiDefinitionAsync(action: ApiDefinitionAction) {
  try {
    const detail = yield getApiDefinitionService(action.id);
    if (detail.code !== 0) {
      NotificationError('Thất bại', detail.message);
      yield put(getApiDefinitionError(detail.message));
    } else {
      yield put(getApiDefinitionSuccess(detail.item));
    }
  } catch (error) {
    yield put(getApiDefinitionError(error));
  }
}

export default function* root() {
  yield all([yield takeLatest(GET_API_DEFINITION, getApiDefinitionAsync)]);
}
