export interface ILoginInput {
  account_id: string;
  password: string;
  device_token?: string;
}

export interface ILoginOutput {
  access_token: string;
  refresh_token: string;
}
