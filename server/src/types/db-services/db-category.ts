
interface CreateCategoryType{
    name: string,
    slug: string
}


interface UpdateCategoryType {
    id: number,
    name?: string,
    slug?: string
}

interface DeleteCategoryType{
    id: number
}


interface CategoryTableType extends CreateCategoryType {
    id: number,
    createdAt: Date,
    updatedAt: Date
}


export type {
    CreateCategoryType,
    CategoryTableType,
    UpdateCategoryType,
    DeleteCategoryType
}