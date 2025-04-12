export interface IResponceAuth {
  name: string;
  email: string;
  birthday: string;
  number: string;
  password: string;
  role: 'admin' | 'user';
  client_id: number;
}

export interface IResponceAuthWithMess {
  message: string;
  user: IResponceAuth;
}
