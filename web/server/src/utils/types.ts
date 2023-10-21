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
  TEST_POSTGRES_DB?: string;
  TEST_PGHOST?: string;
  TEST_PGPORT?: number;
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

export interface InfoMsg {
  style?: string;
  message?: string | null;
}

// TYPES

export type User = Omit<Omit<UserFull, "passwd">, "verifycode">;
