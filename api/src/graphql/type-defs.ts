import { gql } from "apollo-server-express";

const typeDefs = gql`

  enum CENCertifications {
    A
    B
    C
    D
  }

  enum Practices {
    ecole
    cross
    hikeNfly
    acro
    comp
  }

  type Paraglinder {
    name: String!
    brand: String!
    allon: Float!
    CEN: CENCertifications!
    practice: Practices!
    ratio: Int!
  }


  type Brand {
    name: String!
  }

  type Pagination {
    total: Int!
    pageCount: Int!
    currentPage: Int!
  }

  type ParaglindersResponse {
    paraglinders: [Paraglinder]!
    pagination: Pagination!
  }

  enum SortByField {
    name
    brand
    allon
    CEN
    practice
    ratio
  }

  type Query {

    paraglinders(
      """ Number of results by page. Must be >= 1. Default = 20 """
      pageSize: Int
      """ Page number. Must be >= 1. Default = 1 """
      pageNumber: Int
      """ Sort paraglinders by specified field. """
      sortBy: SortByField
      ): ParaglindersResponse!

      brands: [Brand]!
  }

  type Mutation {
    updateParaglinder(
      name: String!
      brand: String!
      allon: Float
      CEN: CENCertifications
      practice: Practices
      ratio: Int
    ): Paraglinder!

    
    deleteParaglinder(
      name: String!
      brand: String!
    ): Boolean
  }
`;


export default typeDefs;