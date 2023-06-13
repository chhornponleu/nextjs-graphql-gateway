import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

const resolvers = {
    Query: {
        hello: async () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('Hello world!');
                }, 400);
            })
        },
        welcome: async () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        name: 'Ponleu',
                    });
                }, 500);
            })
        }
    },
};

const typeDefs = gql`
  type Query {
    hello: String
    welcome: Welcome
  }
  type Welcome {
    name: String
}
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req })
});

export async function GET(request: NextRequest) {
    return handler(request);
}

export async function POST(request: NextRequest) {
    return handler(request);
}