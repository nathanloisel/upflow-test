import { ApolloError, IResolvers } from "apollo-server-express";
import ParaCompDb from "../data-sources/db";
import { ParaglindingPractices, CENCertifications } from "../types";

export type SortByField = 'name' | 'brand' | 'allon' | 'CEN' | 'practice' | 'ratio';

interface IGetParaglindersRequest {
  pageSize: number,
  pageNumber: number,
  sortBy?: SortByField,
}

interface IUpdateParaglinderRequest {
  name: string,
  brand: string,
  allon?: number,
  CEN?: CENCertifications,
  practice?: ParaglindingPractices,
  ratio?: number
}

interface IDeleteParaglinderRequest {
  name: string,
  brand: string,
}


type ParaglinderResolvers = IResolvers<any, { dataSources: { db: ParaCompDb } }>;

const resolvers: ParaglinderResolvers = {
  Query: {
    paraglinders: async (_, { pageSize = 20, pageNumber = 1, sortBy }: IGetParaglindersRequest, { dataSources }) => {
      try {
        // parameters validation
        if (pageSize < 1)
          throw new ApolloError("Invalid pageSize parameter. Should be >= 1");
        if (pageNumber < 1)
          throw new ApolloError("Invalid pageNumber parameter. Should be >= 1");

        // get paraglinders entities.
        // add order by name if asked and pagination
        const paraglinders = await dataSources.db.getParaglinders(pageSize, pageNumber, sortBy);

        const [{ count: total }] = await dataSources.db.getTotal();

        return {
          paraglinders,
          pagination: {
            // total number of item
            total,
            // total number of page
            pageCount: Math.floor((total - 1) / pageSize) + 1,
            // current page number
            currentPage: pageNumber
          }
        }
      } catch (e) {
        // the error need to be logged
        throw new ApolloError("Internal Server Error");
      }
    }
  },
  Mutation: {
    updateParaglinder: async (_, { name, brand, CEN, allon, practice, ratio }: IUpdateParaglinderRequest, { dataSources }) => {
      try {
        await dataSources.db.updateParaglinder(name, brand, CEN, allon, practice, ratio);
        return dataSources.db.getParaglinder(name, brand);
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    deleteParaglinder: async (_, { name, brand }: IDeleteParaglinderRequest, { dataSources }) => {
      try {
        return await dataSources.db.deleteParaglinder(name, brand) === 1;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  }
};

export default resolvers;

