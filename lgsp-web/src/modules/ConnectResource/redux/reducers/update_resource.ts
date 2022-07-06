import {
  SHOW_UPDATE_RESOURCE_FORM,
  UPDATE_RESOURCE,
  UPDATE_RESOURCE_ERROR,
  UPDATE_RESOURCE_SUCCESS,
} from '../constanst';
import { UpdateResourceAction, UpdateResourceState } from '../models';

const initState: UpdateResourceState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    description: '',
    quota: 0,
    quotaType: '',
    quotaUnit: '',
    timeUnit: '',
    unitTime: 0,
    uuid: '',
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateResourceAction,
): UpdateResourceState => {
  switch (type) {
    case SHOW_UPDATE_RESOURCE_FORM:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_RESOURCE:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_RESOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
