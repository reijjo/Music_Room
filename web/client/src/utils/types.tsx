// ENUMS

export enum Gender {
  Select = "Select",
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

// INTERFACES

export interface InfoMsg {
  style?: string;
  message?: string | null;
}

export interface UserData {
  email: string;
  passwd: string;
  passwd2: string;
  username: string;
  age: string;
  gender: Gender;
}

export interface FormErrors {
  email: {
    lenMsg: string | null;
    validMsg: string | null;
  };
  passwd: {
    lenMsg: string | null;
    specialMsg: string | null;
    capitalMsg: string | null;
    numMsg: string | null;
  };
  passwd2: {
    pw2Msg: string | null;
  };
  username: {
    lenMsg: string | null;
    validMsg: string | null;
  };
  age: {
    validMsg: string | null;
    youngMsg: string | null;
    oldMsg: string | null;
  };
}

export interface FormFocus {
  email: boolean;
  passwd: boolean;
  passwd2: boolean;
  username: boolean;
  age: boolean;
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
