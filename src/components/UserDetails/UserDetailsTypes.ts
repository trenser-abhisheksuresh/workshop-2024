export interface IUserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export interface IInfoMessage {
  message: string;
  type: "ERROR" | "SUCCESS" | "WARNING" | "INFO";
}

export enum MessageType {
  Success = "SUCCESS",
  Error = "ERROR",
  Info = "INFO",
  Warning = "WARNING",
}
