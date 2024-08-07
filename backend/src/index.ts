import express from "express";
import { json } from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
import http from "http";
import logger from "./utils/logger";
import { ApolloServer } from "@apollo/server";
import { prismaClient } from "./Database/db";
const { expressMiddleware } = require("@apollo/server/express4");

dotenv.config({
  path: ".env",
});
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.json());
// graphql
const apolloServer = new ApolloServer({
  typeDefs: `
        type User {
            id: ID!
            name: String!
          
            email: String!
            password: String!
            
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
            getAllRentalProperties: [Rental]
            getUser(id: ID!): User
        }

        type Mutation {
            createUser(name: String!,  email: String!, password: String!): User
            createRental(title: String!, isAvailable: Boolean!, addedBy: ID!, rentedBy: ID!): Rental
            updateRental(id: ID!, title: String!, isAvailable: Boolean!, addedBy: ID!, rentedBy: ID!): Rental
            deleteRental(id: ID!): Rental                                 
        }

    `,
  resolvers: {
    // Rentals: {
    //   user: (rental) => "user",
    // },
    Query: {
      // getAllRentalProperties: () => USERS,
      // getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
    },
    Mutation: {
      createUser: async (
        parent,
        {
          name,
          email,
          password,
        }: { name: string; email: string; password: string }
      ) => {
        const user = await prismaClient.user.create({
          data: {
            name: name,

            email: email,
            password: password,
          },
        });
        return user;
      },
      // createRental: async (parent, args) => {
      //   const rental = {
      //     id: RENTALS.length + 1,
      //     title: args.title,
      //     isAvailable: args.isAvailable,
      //     addedBy: args.addedBy,
      //     rentedBy: args.rentedBy,
      //   };
      //   RENTALS.push(rental);
      //   return rental;
      // },
      // updateRental: async (parent, args) => {
      //   const rental = RENTALS.find((e) => e.id === args.id);
      //   rental.title = args.title;
      //   rental.isAvailable = args.isAvailable;
      //   rental.addedBy = args.addedBy;
      //   rental.rentedBy = args.rentedBy;
      //   return rental;
      // },
      // deleteRental: async (parent, args) => {
      //   const rental = RENTALS.find((e) => e.id === args.id);
      //   RENTALS = RENTALS.filter((e) => e.id !== args.id);
      //   return rental;
      // },
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
    logger.verbose(
      `Server is listening on port: ${PORT} \n http://localhost:${PORT}/`
    );
  });

  logger.info("Trying to connect with database");

  logger.verbose("🚀 Service started and ready to use");
})();
