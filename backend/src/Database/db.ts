import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const DB_URL = process.env.MONGO_DB_URL || "";
const DB_NAME = process.env.MONGO_DB_DATABASE || "";
const DB_USER = process.env.MONGO_DB_USERNAME || "";
const DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";
const DB_DEBUG = process.env.ENV === "development" ? true : false;

const Mongo = () => {
  const connect = async () => {
    try {
      mongoose.set("debug", DB_DEBUG);
      mongoose.connection
        .on("error", () => logger.error("Error while connecting database"))
        .on("open", () => {
          logger.info("Database connection open");
        })
        .on("connected", () => {
          logger.verbose("Database connected successfully");
        })
        .on("timeout", () => {
          logger.warn("Database connection timeout");
        })
        .on("close", () => {
          logger.error("Database connection closed");
        })
        .on("reconnectFailed", () => {
          logger.warn("Database reconnection failed");
        })
        .on("disconnected", () => {
          logger.error("Database disconnected");
        });
      await mongoose.connect(DB_URL, {
        user: DB_USER,
        pass: DB_PASSWORD,
        dbName: DB_NAME,
      });
    } catch (error) {}
  };

  const disconnect = async () => {
    await mongoose.connection.close();
  };
  return { connect, disconnect };
};

export default Mongo;
