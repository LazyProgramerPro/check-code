export interface IBaseResponse<T> {
  code: number;
  result?: T;
  key?: string;
  message?: string;
}

export interface IPaginationResponse<T> {
  code: number;
  result?: T[];
  current: number;
  pageSize: number;
  total: number;
}
