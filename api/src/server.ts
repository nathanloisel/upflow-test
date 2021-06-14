import { ApolloServer } from 'apollo-server-express';
import { DataSource } from 'apollo-datasource';
import express from 'express';
import cors from 'cors';
import config from 'config';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import ParaCompDb from './data-sources/db';

// These types definitions and resolvers are just an example, you can remove them and move the new types and resolvers elsewhere if you want.

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      db: new ParaCompDb() as DataSource<object>,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.use(cors())
  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${apolloServer.graphqlPath
    }`,
  ));
};



main().catch((error) => {
  console.error('Server failed to start', error);
});
