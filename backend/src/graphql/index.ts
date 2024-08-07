import { ApolloServer } from "@apollo/server";
import { User } from "./user";
const createApolloGraphQLServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
           
    
            type Query {
               ${User.queries}
            }
    
            type Mutation {
                  ${User.mutations}           
            }
    
        `,
    resolvers: {
      Query: {},
      Mutation: { ...User.resolvers.mutations },
    },
  });
  await apolloServer.start();
  return apolloServer;
};
export default createApolloGraphQLServer;
