export interface CreateLDAPParams {
  connectionName: string;
  connectionPassword: string;
  connectionUrl: string;
  description: string;
  domainName: string;
  userListFilter: string;
  userSearchBase: string;
  userSearchFilter: string;
  usernameAttribute: string;
}

export interface ConnectLDAPParams {
  connectionName: string;
  connectionPassword: string;
  connectionUrl: string;
  userListFilter: string;
  userSearchBase: string;
  userSearchFilter: string;
  usernameAttribute: string;
}
