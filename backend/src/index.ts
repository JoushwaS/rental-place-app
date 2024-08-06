import connectDB from "./Database/db";
import express from "express";
import { json } from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
import router from "./routes";
import http from "http";
import logger from "./utils/logger";
import Mongo from "./Database/db";

dotenv.config({
  path: ".env",
});
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

(async () => {
  app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING ");
  });
  app.use("/", json(), cors({ origin: "*" }));
  app.use("/api", router);

  server.listen(PORT, () => {
    logger.verbose(`Server is listening on port: ${PORT}`);
  });

  logger.info("Trying to connect with database");
  await Mongo().connect();

  logger.verbose("🚀 Service started and ready to use");
})();
