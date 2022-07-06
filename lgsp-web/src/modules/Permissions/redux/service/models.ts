export interface paramsGetList {
  page?: number;
  size?: number;
  text?: string;
}

export interface paramsCreatePermission {
  name: string;
  organization: string;
  users: string[];
}

export interface Permission {
  createTime: string;
  id: string;
  name: string;
  organization: string;
  users: string[];
}

export interface ParamSearch {
  key: string;
}
