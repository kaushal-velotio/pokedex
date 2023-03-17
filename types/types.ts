export interface IRegisterInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPass: string;
}
export interface ILoginInput {
  email: string;
  password: string;
}
export interface UserType {
  email: string | null;
  uid: string | null;
}
export interface Pokemon {
  id: number;
  image: string;
  name: string;
  url: string;
}
export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  favorites: string[];
}
