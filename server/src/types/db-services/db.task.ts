
interface CreateTaskType{
    user: number,
    title: string,
    description: string,
    category: number,
    prizeAmount: number,
    status: "draft" | "published",
    expiryTime: Date
}


interface UpdateTaskType{
    id: number,
    title?: string,
    description?: string,
    category?: number,
    prizeAmount?: number,
    status?: "draft" | "published",
    expiryTime?: Date,
    solanaTaskId?: string,
    participants?: number[],
    isCompleted?: boolean,
    completer?: number
}

interface DeleteTaskType{
    id: number
}


interface TaskTableType extends CreateTaskType {
    id: number,
    solanaTaskId: string | null,
    participants: number[] | null,
    isCompleted: boolean,
    completer: number | null,
    createdAt: Date,
    updatedAt: Date
}



export type {
    CreateTaskType,
    TaskTableType,
    UpdateTaskType,
    DeleteTaskType
}