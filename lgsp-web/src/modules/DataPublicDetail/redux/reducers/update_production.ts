import { SHOW_DATA, UPDATE_PRODUCTION, UPDATE_PRODUCTION_ERROR, UPDATE_PRODUCTION_SUCCESS } from '../constanst';
import { UpdateProductionAction, UpdateProductionState } from '../models';

const initState: UpdateProductionState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    applicationTokenExpiryTime: 0,
    expiryTime: 0,
    refreshTime: 0,
    userAccessTokenExpiryTime: 0,
  },
  originData: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initState,
  { type, show, originData, params, error }: UpdateProductionAction,
): UpdateProductionState => {
  switch (type) {
    case SHOW_DATA:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_PRODUCTION:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_PRODUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_PRODUCTION_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
