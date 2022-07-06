import { SHOW_DATA_TEST, UPDATE_TEST, UPDATE_TEST_ERROR, UPDATE_TEST_SUCCESS } from '../constanst';
import { UpdateTestAction, UpdateTestState } from '../models';

const initState: UpdateTestState = {
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
export default (state = initState, { type, show, originData, params, error }: UpdateTestAction): UpdateTestState => {
  switch (type) {
    case SHOW_DATA_TEST:
      return {
        ...state,
        show: show,
        originData: originData,
      };

    case UPDATE_TEST:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_TEST_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };
    default:
      return state;
  }
};
