import express, { Express } from "express";
import { APP_PORT, corsOptions } from "./config/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler.js";


const app: Express = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);

app.listen(APP_PORT, () => {
    
});