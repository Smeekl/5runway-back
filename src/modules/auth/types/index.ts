export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TPayload = {
  userId: number;
  email: string;
  iat: number;
  exp: number;
};

export type TJwtPayload = {
  email: string;
  userId: number;
};

export type TQueryAuth = {
  token: string;
  additionalEmail: string;
};

export type TFacebookAuthResponse = {
  hasEmail: boolean;
  tokens?: TTokens;
};
