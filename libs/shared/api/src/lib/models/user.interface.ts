export enum UserRole {
  User = "user",
  ClubOwner = "clubowner",
  Admin = "admin"
}

export enum UserGender{
  Male = 'male',
  Female = 'female',
  Unknown = ''
}

export interface IUser {
  id: string;
  username: string; 
  email: string; 
  password: string; 
  role: UserRole; 
  gender: UserGender;
  profileImgUrl: string;
}


export interface IUserIdentity {
  id: string;
  name: string;
  email: string;
  profileImgUrl?: string;
  role: string;
  token: string;
}

export type ICreateUser = Pick<IUser, 'username' | 'email' | 'password' | 'role' | 'profileImgUrl' | 'gender'>;

export type IUpdateUser = Partial<Omit<IUser, 'id' >>;

export type IUserInfo = IUser;