import { apiHandler, ok } from "../../middlewares/error.handler.js";
import { FILTER_TASKS_MESSAGE, LATEST_TASK_KEY, LATEST_TASKS_MESSAGE, MOST_PAYING_TASK_KEY, MOST_PAYING_TASKS_MESSAGE } from "../../constants/index.js";
import { redis } from "../../config/redis.connection.js";
import { getLatestTaskWithLimit, getHighestPayingTaskWithLimit, getFilteredTasks } from "../../services/index.js";
import { taskFilterValidator } from "../../vaildators/index.js";


const getLatestTasks = apiHandler( async (req, res) => {
    const cachedData = await redis.get(LATEST_TASK_KEY);

    if(cachedData){
        return ok({
            res,
            message: LATEST_TASKS_MESSAGE,
            data: JSON.parse(cachedData)
        })
    }

    const latestTasks = await getLatestTaskWithLimit({limit: 4});

    await redis.set(LATEST_TASK_KEY, JSON.stringify(latestTasks));

    return ok({
        res,
        message: LATEST_TASKS_MESSAGE,
        data: latestTasks
    });
});

const getHighestPayingTasks = apiHandler( async (req, res) => {
    const cachedData = await redis.get(MOST_PAYING_TASK_KEY);

    if(cachedData){
        return ok({
            res,
            message: MOST_PAYING_TASKS_MESSAGE,
            data: JSON.parse(cachedData)
        })
    }

    const mostPayingTasks = await getHighestPayingTaskWithLimit({limit: 4});

    await redis.set(MOST_PAYING_TASK_KEY, JSON.stringify(mostPayingTasks));

    return ok({
        res,
        message: MOST_PAYING_TASKS_MESSAGE,
        data: mostPayingTasks
    });
});

const filteredTasks = apiHandler(async (req, res, next) => {
    const { category, limit, pageNo, sort } = await taskFilterValidator.validateAsync(req.query);

    const tasks = await getFilteredTasks({category, limit, pageNo, sort});

    return ok({
        res,
        message: FILTER_TASKS_MESSAGE,
        data: {
            tasks
        }
    })
});


export {
    getLatestTasks,
    getHighestPayingTasks,
    filteredTasks
}