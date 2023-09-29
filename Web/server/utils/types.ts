// ENUMS

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  Choose = "Choose",
}

// INTERFACES

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: Gender;
}

export interface FullUserData {
  id: number;
  email: string;
  username: string;
  passwd: string;
  age: string;
  gender: Gender;
  verifycode: string;
  user_status: string;
}

export type User = Omit<FullUserData, "passwd" | "verifycode">;

export interface MessageInfo {
  message: string;
  className: string;
}

export interface LoginCredentials {
  logincredential: string;
  password: string;
}

export interface DecodedToken {
  id: number;
  user: string;
  iat: number;
  exp: number;
}

export interface GoogleTokenObj {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  // authuser: string;
  prompt: string;
}

export interface ConfigType {
  PORT?: number;
  POSTGRES_USER?: string;
  POSTGRES_DB?: string;
  PGADMIN_DEFAULT_PASSWORD?: string;
  PGHOST?: string;
  PGPORT?: number;
  EMAIL_USER?: string;
  EMAIL_PASSWD?: string;
  JWT_SECRET?: string;
  FB_APP_ID: string;
  FB_APP_SECRET: string;
  FRONTEND_HOST: string;
}
