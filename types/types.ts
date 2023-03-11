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
