import {combineReducers} from "redux";
import getState from "./get_users"
import createState from "./create_user"
import updateState from "./update_user"
import deleteState from "./delete_user"
import {CreateUserState, DeleteUserState, GetUserState, UpdateUserState} from "../models";

export interface UserModuleState{
  getState: GetUserState;
  createState: CreateUserState,
  updateState: UpdateUserState,
  deleteState: DeleteUserState,
}

export default combineReducers<UserModuleState> ({
  getState: getState,
  createState: createState,
  updateState: updateState,
  deleteState: deleteState
});
