import { combineReducers } from 'redux';
import { TaskState } from '../models';
import { taskReducers } from './task';

export interface TaskRunPeriodicallyModulesState {
  taskState: TaskState;
}

export default combineReducers<TaskRunPeriodicallyModulesState>({
  taskState: taskReducers,
});
