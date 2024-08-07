import express from "express";
import { json } from "body-parser";
import cors from "cors";

import http from "http";
import logger from "./utils/logger";
import createApolloGraphQLServer from "./graphql";
const { expressMiddleware } = require("@apollo/server/express4");

import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.json());

(async () => {
  app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING ");
  });
  app.use("/", json(), cors({ origin: "*" }));
  app.use("/graphql", expressMiddleware(await createApolloGraphQLServer()));
  server.listen(PORT, () => {
    logger.verbose(
      `Server is listening on port: ${PORT} \n http://localhost:${PORT}/`
    );
  });

  logger.info("Trying to connect with database");

  logger.verbose("🚀 Service started and ready to use");
})();
