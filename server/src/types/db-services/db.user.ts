
interface CreateUserType {
    name: string,
    username: string,
    email: string,
    password: string
}

interface DeleteUserType{
    id: number
}

interface GetUserType{
    id: number
}

interface UpdateUserType{
    id: number,
    name?: string,
    username?: string,
    email?: string,
    password?: string
}


export type {
    CreateUserType,
    DeleteUserType,
    UpdateUserType,
    GetUserType
}