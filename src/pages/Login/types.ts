export interface requestLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export interface ResponseDataBase<T> {
  resultCode: number;
  messages: string[];
  fieldsErrors?: string[];
  data: T;
  error?: string;
}

export interface ResponseLogin {
  userId?: number;
}

export interface ResponseMe {
  id: number;
  email: string;
  login: string;
}

export interface ResponseLogout {
  userId: number;
}

export interface ResponseCaptcha {
  url: string;
}

export interface ResponseDataLogin {
  data: ResponseDataBase<ResponseLogin>;
}

export interface ResponseDataLogout {
  data: ResponseDataBase<ResponseLogout>;
}
export interface ResponseDataMe {
  data: ResponseDataBase<ResponseMe>;
}
