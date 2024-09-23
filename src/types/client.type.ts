export interface SignUpData {
  name: string;
  email: string;
  companyName: string;
  password: string;
  passwordCheck: string;
}

export interface SignInData extends Pick<SignUpData, 'email' | 'password'> {}
