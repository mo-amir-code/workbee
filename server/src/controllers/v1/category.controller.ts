import { apiHandler, ok } from "../../middlewares/index.js";
import { createCategoryValidator } from "../../vaildators/category.validators.js";
import { createCategory as createNewCategory } from "../../db/services/index.js";
import { NEW_CATEGORY_CREATED_MESSAGE } from "../../constants/index.js";


const createCategory = apiHandler( async (req, res) => {
    const data = await createCategoryValidator.validateAsync(req.body);
    await createNewCategory(data);
    return ok({
        res,
        message: NEW_CATEGORY_CREATED_MESSAGE
    })
});


export {
    createCategory
}