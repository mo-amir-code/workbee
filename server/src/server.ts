import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import app from "./app.js";
import { APP_PORT } from "./config/index.js";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(APP_PORT || 8080, () => {
    console.log(`Server running at PORT ${APP_PORT} with PID ${process.pid}`);
  });
}
