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

export interface MessageInfo {
  message: string;
  className: string;
}

export interface ConfigType {
  PORT?: number;
  POSTGRES_USER?: string;
  POSTGRES_DB?: string;
  PGADMIN_DEFAULT_PASSWORD?: string;
  PGHOST?: string;
  PGPORT?: number;
}
