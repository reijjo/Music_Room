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
  picture: string | { data: { url: string } };
  loginStyle: string;
}

export type User = Omit<FullUserData, "passwd" | "verifycode">;

export interface LoginCredentials {
  logincredential: string;
  password: string;
}

export interface MessageInfo {
  message: string;
  className: string;
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

export interface FacebookUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  picture: { data: { url: string } };
  short_name: string;
}
