import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Rental } from "./rental";
const createApolloGraphQLServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            ${Rental.typeDefs}
           
            type Query {
               ${User.queries}
               ${Rental.queries}
            }
    
            type Mutation {
                  ${User.mutations}           
                  ${Rental.mutations}           
            }
        `,
    resolvers: {
      Query: { ...Rental.resolvers.queries, ...User.resolvers.queries },
      Mutation: {
        ...User.resolvers.mutations,
        ...Rental.resolvers.mutations,
      },
    },
  });
  await apolloServer.start();
  return apolloServer;
};
export default createApolloGraphQLServer;
