const ADD_USER_DEPARTMENT = 'ADD_USER_DEPARTMENT';
const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
const END_ADD_USER_DEPARTMENT = 'END_ADD_USER_DEPARTMENT';
const END_CREATE_DEPARTMENT = 'END_CREATE_DEPARTMENT';
const END_DELETE_DEPARTMENT = 'END_DELETE_DEPARTMENT';
const END_GET_DEPARTMENT_DETAILS = 'END_GET_DEPARTMENT_DETAILS';
const END_GET_DEPARTMENT_USERS = 'END_GET_DEPARTMENT_USERS';
const END_GET_DEPARTMENTS = 'END_GET_DEPARTMENTS';
const END_REMOVE_USER_DEPARTMENT = 'END_REMOVE_USER_DEPARTMENT';
const END_UPDATE_DEPARTMENT = 'END_UPDATE_DEPARTMENT';
const GET_DEPARTMENT_DETAILS = 'GET_DEPARTMENT_DETAILS';
const GET_DEPARTMENT_USERS = 'GET_DEPARTMENT_USERS';
const GET_DEPARTMENTS = 'GET_DEPARTMENTS';
const REMOVE_USER_DEPARTMENT = 'REMOVE_USER_DEPARTMENT';
const START_CREATE_DEPARTMENT = 'START_CREATE_DEPARTMENT';
const START_UPDATE_DEPARTMENT = 'START_UPDATE_DEPARTMENT';
const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT';

export interface IOutput {
  type: string;
  loading?: boolean;
  data?: any;
  error?: any;
  saveDone?: boolean;
  users?: any;
  userFilters?: any;
  departmentId?: string;
  departmentDetails?: any;
}

export const getDepartments = (): IOutput => ({type: GET_DEPARTMENTS, loading: true});
export const endGetDepartments = (data: any, error: any): IOutput => ({
  type: END_GET_DEPARTMENTS,
  loading: false,
  data: data,
  error: error,
});

export const startCreateDepartment = (): IOutput => ({
  type: START_CREATE_DEPARTMENT,
  loading: false,
  saveDone: false,
});
export const createDepartment = (data: any): IOutput => ({
  type: CREATE_DEPARTMENT,
  loading: true,
  saveDone: false,
  data: data,
});
export const endCreateDepartment = (data: any, error: any): IOutput => ({
  type: END_CREATE_DEPARTMENT,
  loading: false,
  saveDone: true,
  data: data,
  error: error,
});

export const startUpdateDepartment = (): IOutput => ({
  type: START_UPDATE_DEPARTMENT,
  loading: false,
  saveDone: false,
});
export const updateDepartment = (data: any): IOutput => ({type: UPDATE_DEPARTMENT, loading: true, data: data});
export const endUpdateDepartment = (data: any, error: any): IOutput => ({
  type: END_UPDATE_DEPARTMENT,
  loading: false,
  data: data,
  error: error,
});

export const deleteDepartment = (data: any): IOutput => ({type: DELETE_DEPARTMENT, loading: true, data: data});
export const endDeleteDepartment = (data: any, error: any): IOutput => ({
  type: END_DELETE_DEPARTMENT,
  loading: false,
  data: data,
  error: error,
});

export const removeUserDepartment = (data: any): IOutput => ({
  type: REMOVE_USER_DEPARTMENT,
  loading: true,
  data: data,
});
export const endRemoveUserDepartment = (data: any, error: any): IOutput => ({
  type: END_REMOVE_USER_DEPARTMENT,
  loading: false,
  data: data,
  error: error,
});
export const addUserDepartment = (data: any): IOutput => ({type: ADD_USER_DEPARTMENT, loading: true, data: data});
export const endAddUserDepartment = (data: any, error: any): IOutput => ({
  type: END_ADD_USER_DEPARTMENT,
  loading: false,
  data: data,
  error: error,
});

export const getDepartmentUsers = (data: any): IOutput => {
  return {type: GET_DEPARTMENT_USERS, loading: true, userFilters: data};
};
export const endGetDepartmentUsers = (data: any, error: any): IOutput => ({
  type: END_GET_DEPARTMENT_USERS,
  loading: false,
  users: data,
  error: error,
});

export const getDepartmentDetails = (data: any): IOutput => {
  return {type: GET_DEPARTMENT_DETAILS, loading: true, departmentId: data};
};
export const endGetDepartmentDetails = (data: any, error: any): IOutput => ({
  type: END_GET_DEPARTMENT_DETAILS,
  loading: false,
  departmentDetails: data,
  error: error,
});
