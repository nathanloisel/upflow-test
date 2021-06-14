import { gql, useMutation } from '@apollo/client';
import * as React from 'react';
import {
  CENCertifications,
  IParaglinder,
  ParaglindingPractices,
} from 'types/paraglinders';

export const UPDATE_PARAGLINDERS = gql`
  mutation UpdateParaglinder(
    $name: String!
    $brand: String!
    $allon: Float
    $CEN: CENCertifications
    $practice: Practices
    $ratio: Int
  ) {
    updateParaglinder(
      name: $name
      brand: $brand
      allon: $allon
      CEN: $CEN
      practice: $practice
      ratio: $ratio
    ) {
      name
      brand
      allon
      CEN
      practice
      ratio
    }
  }
`;
interface IUpdataParaglinderParams {
  name: string;
  brand: string;
  allon?: number;
  CEN?: CENCertifications;
  practice?: ParaglindingPractices;
  ratio?: number;
}

export function useUpdateParaglinders() {
  const [update, { data, loading, error }] = useMutation<
    { updateParaglinder: IParaglinder },
    IUpdataParaglinderParams
  >(UPDATE_PARAGLINDERS);

  const updateParaglinder = React.useCallback(
    (data: IUpdataParaglinderParams) => {
      return update({ variables: data });
    },
    [update]
  );

  return { updateParaglinder, response: data, loading, error };
}

export const DELETE_PARAGLINDERS = gql`
  mutation DeleteParaglinder($name: String!, $brand: String!) {
    deleteParaglinder(name: $name, brand: $brand)
  }
`;

interface IDeleteParaglinderParams {
  name: string;
  brand: string;
}
export function useDeleteParaglinders() {
  const [del, { data, loading, error }] = useMutation<
    boolean,
    IDeleteParaglinderParams
  >(DELETE_PARAGLINDERS);

  const deleteParaglinder = React.useCallback(
    (name: string, brand: string) => {
      return del({ variables: { name, brand } });
    },
    [del]
  );

  return { deleteParaglinder, response: data, loading, error };
}
