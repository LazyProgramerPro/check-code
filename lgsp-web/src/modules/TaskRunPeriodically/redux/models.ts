import { AppError } from 'src/models/common';

export interface TaskParams {
  count?: number;
  createAt?: string;
  dataServiceId?: string;
  dataServiceName?: string;
  delayTime?: number;
  id?: string;
  operationName?: string;
  startTime?: any;
  name?: string;
}

export interface GetListTaskParams {
  page?: number;
  size?: number;
  text?: string;
}

export interface ListDataService {
  id?: string;
  name?: string;
  description?: string;
  dataSources?: any[];
  dataSourceConfigs?: any[];
  multipartFileList?: any;
  operations?: any[];
  queries?: any[];
  resources?: any[];
  file?: any[];
}

export interface TaskState {
  loading: boolean;
  show: boolean;
  paramsGetList?: GetListTaskParams;
  tasksEdit?: TaskParams;
  listDataService?: ListDataService[];
  listOperation?: string[];
  tasks: TaskParams[];
  error?: AppError;
  isUpdate?: boolean;
  load_page?: boolean;
  flag_reload: boolean;
}

export interface TaskAction {
  type: string;
  show?: boolean;
  paramsGetList?: GetListTaskParams;
  listDataService?: ListDataService[];
  listOperation?: string[];
  params?: any;
  error?: AppError;
  isUpdate?: boolean;
  dataServiceId?: string;
  paramCreate?: TaskParams;
}
