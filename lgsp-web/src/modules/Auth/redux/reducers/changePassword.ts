import * as Actions from '../actions';
import {ChangePasswordAction} from '../actions';
import {AppError} from 'src/models/common';

export interface ChangePasswordState {
  payload?: any;
  loading: boolean;
  error?: AppError;
}

const initialState: ChangePasswordState = {
  loading: false,
  payload: {},
};

export default (state = initialState, {type, payload, error}: ChangePasswordAction): ChangePasswordState => {
  switch (type) {
    case Actions.CHANGE_PASSWORD_ACTION:
      return {
        ...state,
        payload: payload,
        error: undefined,
        loading: true,
      };

    case Actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case Actions.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
};
