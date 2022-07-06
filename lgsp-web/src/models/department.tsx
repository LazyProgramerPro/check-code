export interface Department {
  id: string;
  name: string;
  code: string;
  parent_id?: string;
  manager_id?: string;
  isDeleted?: boolean;
  manager?: string;
  level?: string;
  children?: Department[];
  directManager?: DirectManager
}

export interface CreateDepartmentVariable {
  id?: string | '';
  name?: string | '';
  code?: string | '';
  parent_id?: string | '';
  type?: string | '';
  working_shift_ids?: any | null;
  working_shift_id_now?: string | '';
  cycle?: string | '';
  isRoot?: boolean | false;
  parent?: any;
  next_day?: string | '';
}

export interface FlatDepartment extends Department {
  flatLevel?: number;
}

export interface DirectManager {
  id: string;
  code: string;
  status: string;
  first_name: string;
  last_name: string;
  full_name: string;
}
