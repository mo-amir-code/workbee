interface CreateAuthType {
  user: number;
  role?: "user" | "admin";
  refreshToken?: string | null;
}

interface UpdateAuthType {
  user: number;
  role?: "user" | "admin";
  verified?: boolean;
  otp?: string | null;
  otpToken?: string | null;
  refreshToken?: string;
}

interface DeleteAuthType {
  user: number;
}

type GetAuthType = AuthWithId | AuthWithUser;

interface AuthWithId {
  id: number;
  user?: never;
}

interface AuthWithUser {
  id?: never;
  user: number;
}

interface AuthTableType extends CreateAuthType {
  id: number;
  verified: boolean;
  otp: string | null;
  otpToken: string | null;
}

export type {
  CreateAuthType,
  AuthTableType,
  UpdateAuthType,
  DeleteAuthType,
  GetAuthType,
};
