import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_SUCCESS,
  RELOAD_DATA_ORGANIZATION,
} from '../constant';
import { GetOrganizationAction } from '../models';

// OrganizationAction
export const getOrganization = (): GetOrganizationAction => {
  return {
    type: GET_ORGANIZATION,
  };
};
export const getOrganizationSuccess = (resp: any): GetOrganizationAction => {
  return {
    type: GET_ORGANIZATION_SUCCESS,
    payload: resp,
  };
};
export const getOrganizationErrors = (error: GetOrganizationAction['error']): GetOrganizationAction => {
  return {
    type: GET_ORGANIZATION_ERROR,
    error: error,
  };
};
export const reloadDataOrganization = (): GetOrganizationAction => {
  return {
    type: RELOAD_DATA_ORGANIZATION,
  };
};
