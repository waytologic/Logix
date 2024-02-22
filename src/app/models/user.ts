export class UsersList {
  id?: any;
  name?: string;
  email?: string;
  address?: string;
  phoneno?:any;
  role?:string;
  status?:boolean;
}

export interface Users{
  username?:string,
  password?:string,
  name?:string,
  email?:string,
  phone?:string,
  role?:string,
  status?:boolean
}

export interface Usercred{
  email:string,
  username:string,
  password:string
}

export interface Userinfo{
  id:number,
  username:string,
  name:string,
  email:string,
  role:string,
  status:boolean
}
