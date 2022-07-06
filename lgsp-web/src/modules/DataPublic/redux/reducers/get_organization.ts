import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_SUCCESS,
  RELOAD_DATA_ORGANIZATION,
} from '../constant';
import { GetOrganizationAction, GetOrganizationState } from '../models';

const initState: GetOrganizationState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  error: undefined,
};

export const getOrganizationState = (
  state = initState,
  { type, payload, error }: GetOrganizationAction,
): GetOrganizationState => {
  switch (type) {
    case GET_ORGANIZATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows: payload?.rows || [],
        total: payload?.total || 0,
      };
    }

    case GET_ORGANIZATION_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_ORGANIZATION: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
