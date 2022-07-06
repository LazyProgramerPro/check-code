import { GET_TEST, GET_TEST_ERROR, GET_TEST_SUCCESS, RELOAD_DATA_TEST } from '../constanst';
import { GetTestAction, GetTestState, Test } from '../models';

const initTest: Test = {
  id: '',
  applicationTokenExpiryTime: '',
  consumerSecret: '',
  userAccessTokenExpiryTime: '',
  password_grant_type: '',
  refreshTime: '',
  expiryTime: '',
  consumerKey: '',
  client_credential: '',
};

const initState: GetTestState = {
  loading: false,
  item: initTest,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getTestState = (state = initState, { type, payload, error, params }: GetTestAction): GetTestState => {
  switch (type) {
    case GET_TEST: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_TEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case GET_TEST_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_TEST: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
