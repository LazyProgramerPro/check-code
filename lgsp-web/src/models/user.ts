export interface User{
  id:string;
  name:string;
  username:string;
  code?:string;
  email?:string;
  phone?:string;
  active?: boolean;
}
