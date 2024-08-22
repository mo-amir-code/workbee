import express, { Express } from "express";
import { corsOptions } from "./config/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler.js";
import helmet from "helmet";
import routes from "./routes/index.js";

const app: Express = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorHandler);

export default app;
