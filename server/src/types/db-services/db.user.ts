interface CreateUserType {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface DeleteUserType {
  id: number;
}

type GetUserType = UserWithEmail | UserWithId | UserWithUsername;

interface UserWithId {
  id: number;
  username?: never;
  email?: string;
}

interface UserWithEmail {
  id?: never;
  username?: never;
  email: string;
}

interface UserWithUsername {
  id?: never;
  email?: never;
  username: string;
}

interface UpdateUserType {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

interface UserTableType extends CreateUserType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type {
  CreateUserType,
  DeleteUserType,
  UpdateUserType,
  GetUserType,
  UserTableType,
};
