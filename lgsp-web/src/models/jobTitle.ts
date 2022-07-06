export interface JobTitle {
  id: string;
  create_time: number;
  update_time: number;
  name: string;
  is_deleted: boolean;
  deleted_time: number;
}

export interface EventCheckType {
  key: string;
  name: string;
}