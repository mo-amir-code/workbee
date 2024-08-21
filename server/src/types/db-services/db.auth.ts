
interface CreateAuthType{
    user: number,
    role: "user" | "admin",
    refreshToken?: string | null
}


interface UpdateAuthType{
    user: number,
    role?: "user" | "admin",
    verified?: boolean,
    otp?: string,
    otpToken?: string,
    refreshToken?: string,
}


interface DeleteAuthType {
    user: number
}


interface AuthTableType extends CreateAuthType {
    id: number,
    verified: boolean,
    otp: string | null,
    otpToken: string | null
}



export type {
    CreateAuthType,
    AuthTableType,
    UpdateAuthType,
    DeleteAuthType
}