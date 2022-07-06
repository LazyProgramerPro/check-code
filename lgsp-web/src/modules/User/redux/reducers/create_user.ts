import { CreateUserAction, CreateUserState } from '../models';
import {
  ACCEPT_USERS,
  ACCEPT_USERS_ERROR,
  ACCEPT_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  REJECT_USERS,
  REJECT_USERS_ERROR,
  REJECT_USERS_SUCCESS,
  SHOW_CREATE_USER_FORM,
} from '../constant';

const initState: CreateUserState = {
  loading: false,
  show: false,
  error: undefined,
  params: {
    username: '',
    fullName: '',
    password: '',
    email: '',
    phoneNumber: '',
    position: '',
    organization: '',
    department: '',
    address: '',
    under: '',
    role: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, { type, show, params, error }: CreateUserAction): CreateUserState => {
  switch (type) {
    case SHOW_CREATE_USER_FORM:
      return {
        ...state,
        show: !!show,
      };

    case CREATE_USER:
      return {
        ...state,
        loading: true,
        params: params,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    //ACCEPT_USERS

    case ACCEPT_USERS:
      return {
        ...state,
        loading: true,
      };

    case ACCEPT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ACCEPT_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    //REJECT_USER

    case REJECT_USERS:
      return {
        ...state,
        loading: true,
      };

    case REJECT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REJECT_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
};
