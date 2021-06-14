import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.RAZZLE_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});
