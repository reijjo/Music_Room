// ENUMS

export enum Gender {
  Select = "Select",
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

// INTERFACES

export interface DotenvConfig {
  PORT?: number;
  POSTGRES_USER?: string;
  POSTGRES_DB?: string;
  PGADMIN_DEFAULT_PASSWORD?: string;
  PGHOST?: string;
  PGPORT?: number;
}

export interface UserFull {
  id: number;
  email: string;
  passwd: string;
  username: string;
  age: string;
  gender: Gender;
  verifycode: string;
  status: number;
  facebook_id: number;
  google_id: number;
}

// TYPES

export type User = Omit<Omit<UserFull, "passwd">, "verifycode">;
