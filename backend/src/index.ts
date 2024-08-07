import express from "express";
import { json } from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
import http from "http";
import logger from "./utils/logger";
import Mongo from "./Database/db";
import { ApolloServer } from "@apollo/server";
const { expressMiddleware } = require("@apollo/server/express4");

dotenv.config({
  path: ".env",
});
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// graphql
const apolloServer = new ApolloServer({
  typeDefs: `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            password: String!
            Rentals: [Rental]
        }

        type Rental {
            id: ID!
            title: String!
            isAvailable: Boolean!
            addedBy: User
            rentedBy: User
        }

        type Query {
            getTodos: [Rental]
            getAllUsers: [User]
            getUser(id: ID!): User
        }

    `,
  resolvers: {
    // Rentals: {
    //   user: (rental) => "user",
    // },
    Query: {
      // getAllUsers: () => USERS,
      // getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
    },
  },
});
(async () => {
  app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING ");
  });
  app.use("/", json(), cors({ origin: "*" }));

  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));
  server.listen(PORT, () => {
    logger.verbose(`Server is listening on port: ${PORT}`);
  });

  logger.info("Trying to connect with database");
  await Mongo().connect();

  logger.verbose("🚀 Service started and ready to use");
})();
