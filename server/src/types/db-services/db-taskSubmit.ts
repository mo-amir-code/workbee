

interface CreateTaskSubmitType{
    user: number,
    task: number,
    coverLetter: string,
    credentials: string,
    solanaWalletAddress: string
}

interface UpdateTaskSubmitType{
    id: number,
    task?: number,
    user?: number,
    coverLetter?: string,
    credentials?: string,
    solanaWalletAddress?: string,
    status?: "pending" | "accepted" | "rejected" | "inProgress"
}

interface DeleteTaskSubmitType{
    id: number
}


interface TaskSubmitTableType extends CreateTaskSubmitType {
    id: number,
    status: "pending" | "accepted" | "rejected" | "inProgress",
    createdAt: Date,
    updatedAt: Date
}


export type {
    CreateTaskSubmitType,
    TaskSubmitTableType,
    UpdateTaskSubmitType,
    DeleteTaskSubmitType
}