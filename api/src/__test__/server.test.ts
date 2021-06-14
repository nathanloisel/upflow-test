import { ApolloServer } from 'apollo-server-express';

import ParaCompDb from '../data-sources/db';
import typeDefs from '../graphql/type-defs';
import resolvers from '../graphql/resolvers';

const GET_PARAGLINDERS = `
  query GetParaglinders {
    paraglinders {
      paraglinders {
        name
        brand
        allon
        practice
        ratio
      }
      pagination {
        total
        pageCount
        currentPage
      }
    }
  }
`;

describe("Integration test against apollo server", () => {

  const db = new ParaCompDb();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      db
    }),
  });

  // @ts-ignore
  db.getTotal = jest.fn(() => Promise.resolve([{ count: 3 }]));

  // @ts-ignore
  db.getParaglinders = jest.fn(() => Promise.resolve([
    {
      "name": "9cb3da02",
      "brand": "Nitracyr",
      "allon": 4.77,
      "CEN": "B",
      "practice": "ecole",
      "ratio": 11
    },
    {
      "name": "5b96396b",
      "brand": "Avit",
      "allon": 6.07,
      "CEN": "A",
      "practice": "hikeNfly",
      "ratio": 10
    },
    {
      "name": "94be658d",
      "brand": "Avit",
      "allon": 5.6,
      "CEN": "A",
      "practice": "ecole",
      "ratio": 11
    }]));

  it("test apollo server return paraglinders", async () => {

    // run query against the server and snapshot the output
    const res = await apolloServer.executeOperation({ query: GET_PARAGLINDERS });
    expect(res).toMatchSnapshot();
  });

});