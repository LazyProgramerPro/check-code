import * as Actions from '../actions';
import {ChangePasswordFormAction} from '../actions';

export interface ChangePasswordFormState {
  visible?: boolean;
  loading?: boolean;
}

const initialState: ChangePasswordFormState = {
  visible: false,
};

export default (
  state = initialState,
  {type, visible}: ChangePasswordFormAction,
): ChangePasswordFormState => {
  switch (type) {
    case Actions.HIDE_FORM_CHANGE_PASSWORD:
    case Actions.SHOW_FORM_CHANGE_PASSWORD:
      return {
        ...state,
        visible,
      };

    default:
      return state;
  }
};
