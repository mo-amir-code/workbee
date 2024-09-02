import express, { Express } from "express";
import { corsOptions } from "./config/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler.js";
import helmet from "helmet";
import routes from "./routes/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { gqlResolvers, gqlSchema } from "./graphql/index.js";
import logger, { morganFormat } from "../logger.js";
import morgan from "morgan";
import { isUserAuthenticated } from "./middlewares/user.middleware.js";

const app: Express = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// REST API's
app.use("/api", routes);

// GraphQL API'S
async function graphQLServer() {
  const apolloServer = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: gqlResolvers,
  });
  await apolloServer.start();
  app.use("/graphql", isUserAuthenticated, expressMiddleware(apolloServer));
}
graphQLServer();

app.use(errorHandler);

export default app;
