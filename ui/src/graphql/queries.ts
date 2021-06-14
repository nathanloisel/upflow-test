import { gql } from '@apollo/client';
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { IParaglinder } from 'types/paraglinders';
import { IPagination } from 'components/Table';

export const GET_PARAGLINDERS = gql`
  query GetParaglinders(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: SortByField
  ) {
    paraglinders(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
    ) {
      paraglinders {
        name
        brand
        allon
        CEN
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

export type SortByField =
  | 'name'
  | 'brand'
  | 'allon'
  | 'CEN'
  | 'practice'
  | 'ratio';

export interface IParaglindersRequest {
  pageSize: number;
  pageNumber: number;
  sortBy?: SortByField;
}
interface IGetParaglindersResponse {
  paraglinders: {
    paraglinders: Array<IParaglinder>;
    pagination: IPagination;
  };
}

export function useParaglinders() {
  const [queryParams, setQueryParams] = React.useState<IParaglindersRequest>({
    pageNumber: 1,
    pageSize: 10,
    sortBy: undefined,
  });
  const { loading, data, fetchMore, refetch, error } = useQuery<
    IGetParaglindersResponse,
    IParaglindersRequest
  >(GET_PARAGLINDERS, { variables: queryParams });
  const onNextPage = React.useCallback(() => {
    const params = { ...queryParams, pageNumber: queryParams.pageNumber + 1 };
    setQueryParams(params);
    fetchMore({ variables: params });
  }, [queryParams, setQueryParams, fetchMore]);

  const onPrevPage = React.useCallback(() => {
    const params = { ...queryParams, pageNumber: queryParams.pageNumber - 1 };
    setQueryParams(params);
    fetchMore({ variables: params });
  }, [queryParams, setQueryParams, fetchMore]);

  const onSort = React.useCallback(
    (columnName: SortByField) => {
      const params = { ...queryParams, pageNumber: 1, sortBy: columnName };
      setQueryParams(params);
      refetch(params);
    },
    [queryParams, setQueryParams, refetch]
  );

  return {
    onNextPage,
    onPrevPage,
    onSort,
    pagination: data?.paraglinders.pagination,
    paraglinders: data?.paraglinders.paraglinders,
    loading,
    error,
    refetch,
  };
}
