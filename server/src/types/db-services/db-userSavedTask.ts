interface CreateUserSavedTaskType {
  user: number;
}

interface AddTaskInUserSavedTask {
  user: number;
  task: number;
}

interface UserSavedTaskTableType extends CreateUserSavedTaskType {
  id: number;
  tasks: number[] | null;
}

export type {
  CreateUserSavedTaskType,
  AddTaskInUserSavedTask,
  UserSavedTaskTableType,
};
