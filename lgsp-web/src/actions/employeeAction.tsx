const END_GET_EMPLOYEES = 'END_GET_EMPLOYEES';
const END_SET_EMPLOYEE_TO_DEPARTMENT = 'END_SET_EMPLOYEE_TO_DEPARTMENT';
const GET_EMPLOYEES = 'GET_EMPLOYEES';
const SET_EMPLOYEE_TO_DEPARTMENT = 'SET_EMPLOYEE_TO_DEPARTMENT';
const START_SET_EMPLOYEE_TO_DEPARTMENT = 'START_SET_EMPLOYEE_TO_DEPARTMENT';

export interface IOutput {
  type: string;
  loading?: boolean;
  data?: any;
  filter?: any;
  error?: any;
  saveDone?: boolean;
}

export const getEmployees = (data: any): IOutput => ({type: GET_EMPLOYEES, filter: data, loading: true});
export const endGetEmployees = (data: any, error: any): IOutput => ({
  type: END_GET_EMPLOYEES,
  data: data,
  loading: false,
  error: error,
});

export const startSetEmployeeToDepartment = (): IOutput => ({
  type: START_SET_EMPLOYEE_TO_DEPARTMENT,
  loading: false,
  saveDone: false,
});
export const setEmployeeToDepartment = (data: any): IOutput => ({
  type: SET_EMPLOYEE_TO_DEPARTMENT,
  loading: true,
  saveDone: false,
  data: data,
});
export const endSetEmployeeToDepartment = (data: any, error: any): IOutput => ({
  type: END_SET_EMPLOYEE_TO_DEPARTMENT,
  loading: false,
  saveDone: true,
  data: data,
  error: error,
});
