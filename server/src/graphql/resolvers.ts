import { getLatestTask } from "./controllers/index.js";


export default {
    Query: {
        latestTask: async () => await getLatestTask()
    }
}