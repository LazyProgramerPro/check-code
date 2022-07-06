import {combineReducers} from 'redux';
import auth, {LoginState} from './auth';
import changePassword, {ChangePasswordState} from './changePassword';
import changePasswordFrom, {ChangePasswordFormState} from './from';

export interface AuthModuleState {
  auth: LoginState;
  changePassword: ChangePasswordState;
  changePasswordFrom: ChangePasswordFormState;
}

export default combineReducers<AuthModuleState>({
  auth,
  changePassword,
  changePasswordFrom,
});
