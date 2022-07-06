import {Department} from "./department";

export interface Role {
  id: string;
  name: string;
  code: string;
  create_time: string;
  update_time: string;
  slug: string;
}

export interface RoleState {
  role_id: string;
  department_id: string;
  role_name: string;
  department_name: string;
  key: string;
}

export interface RoleScope {
  role: Role;
  scopeDepartment: Department;
}
