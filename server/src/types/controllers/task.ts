

interface LatestTaskWithLimits {
    limit: number
}

interface FilterTasksType {
    limit: number,
    pageNo: number,
    category: number,
    sort: string
}

interface LatestOrMostPayingTaskType{
    id: number,
    title: string,
    participants: number,
    prizeAmount: number,
    expiryTime: Date
}

export {
    LatestTaskWithLimits,
    LatestOrMostPayingTaskType,
    FilterTasksType
}