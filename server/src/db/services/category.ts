import { DB } from "../../config/db.connection.js"
import { CategoryTable } from "../schemas/index.js"
import { CategoryTableType, CreateCategoryType, DeleteCategoryType, UpdateCategoryType } from "../../types/db-services/index.js"
import { eq } from "drizzle-orm";


const createCategory = async (categoryData:CreateCategoryType): Promise<CategoryTableType> => {
    const category = await DB.insert(CategoryTable).values(categoryData).returning();
    return category[0];
}

const updateCategory = async (newData:UpdateCategoryType): Promise<CategoryTableType> => {
    const category = await DB.update(CategoryTable).set(newData).where(eq(CategoryTable.id, newData.id)).returning();
    return category[0];
}

const deleteCategory = async ({id}:DeleteCategoryType): Promise<CategoryTableType> => {
    const category = await DB.delete(CategoryTable).where(eq(CategoryTable.id, id)).returning();
    return category[0];
}

const getCategory = async ({id}:DeleteCategoryType): Promise<CategoryTableType> => {
    const category = await DB.select().from(CategoryTable).where(eq(CategoryTable.id, id));
    return category[0];
}


export {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
}