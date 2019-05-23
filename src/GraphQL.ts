import { ApolloServer, AuthenticationError } from "apollo-server-lambda";
import * as typeDefs from './gql/schema.gql'
import { resolvers } from "./gql/resolvers";

// webpack loader is doing the magic at the moment
// const typeDefs = gql(importSchema("schema.graphql"));

// load environment variables
const auth_token = process.env.AUTH_TOKEN;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ event }) => {
        const token = event.headers['Authorization'];
        if (token !== auth_token) {
            throw new AuthenticationError('you must be logged in');	
        }
        // if (event.path === '/graphql') {
        //     return { user: {} };
        // }
        // else {
        //     const user = retrieveUser(event);
        //     if (!user) throw 'you must be logged in to query this schema';
        //     return { user: user };
        // }
    }
});

function retrieveUser(sth: any) {
    console.log("i am alive");
    console.log(sth);
    return null;
}

export const handler = (event, lambdaContext, callback) => {
    // Playground handler
    if (event.httpMethod === 'GET') {
        server.createHandler()(
            { ...event, path: event.requestContext.path || event.path },
            lambdaContext,
            callback,
        );
    } else {
        server.createHandler()(event, lambdaContext, callback);
    }
};
