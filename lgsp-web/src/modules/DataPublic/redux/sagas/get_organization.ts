import { put } from 'redux-saga/effects';
import { ActionBase } from 'src/models/common';
import { getOrganizationErrors, getOrganizationSuccess } from '../action/get_organization';
import {getAllDeploymentUnit, getAllOrganization} from '../service/apis';

export function* getAllOrganizationAsync(action: ActionBase<{}>) {
  try {
    const datas = yield getAllDeploymentUnit();
    yield put(getOrganizationSuccess(datas));
  } catch (error) {
    yield put(getOrganizationErrors(error));
  }
}
