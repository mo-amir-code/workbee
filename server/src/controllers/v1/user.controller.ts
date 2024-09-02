import { apiHandler, ok } from "../../middlewares/index.js";
import { createTaskValidator } from "../../vaildators/index.js";
import { createTask as createNewTask } from "../../db/services/index.js";
import { NEW_TASK_CREATED_MESSAGE } from "../../constants/index.js";


const createTask = apiHandler(async (req, res) => {
    const data = await createTaskValidator.validateAsync(req.body);

    let taskStatus: "draft" | "published" = "published";

    if(!data?.solanaTaskId){
        taskStatus = "draft";
    }

    await createNewTask({...data, taskStatus});

    return ok({
        res,
        message: NEW_TASK_CREATED_MESSAGE
    });
});


export {
    createTask
}