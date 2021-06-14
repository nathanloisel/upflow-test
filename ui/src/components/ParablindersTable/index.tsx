import * as React from 'react';

import { IParaglinder } from 'types/paraglinders';
import Loading from 'components/Loading';
import Table, { ColumnDefinition, IPagination } from 'components/Table';
import { SortByField } from 'graphql/queries';

export interface IParaglindersTableProps {
  loading: boolean;
  paraglinders?: Array<IParaglinder>;
  pagination?: IPagination;
  error?: any;
  onSort: (columnName: SortByField) => void;
  onNextPage: VoidFunction;
  onPrevPage: VoidFunction;
  onDelete: (index: number) => void;
  onRowChange: (index: number, newData: IParaglinder) => void;
}

export const COLUMN_LABELS = new Map<SortByField, ColumnDefinition>([
  ['name', { title: 'Modèle', type: 'string', editable: false }],
  ['brand', { title: 'Marque', type: 'string', editable: false }],
  [
    'CEN',
    {
      title: 'Certification EN',
      type: 'enum',
      enum: ['A', 'B', 'C', 'D'],
      editable: true,
    },
  ],
  [
    'practice',
    {
      title: 'pratique',
      type: 'enum',
      enum: ['ecole', 'cross', 'hikeNfly', 'acro', 'comp'],
      editable: true,
    },
  ],
  ['allon', { title: 'Allongement', type: 'float', editable: true }],
  [
    'ratio',
    {
      title: 'Finesse',
      type: 'range',
      range: [7, 12],
      rangeStep: 1,
      editable: true,
    },
  ],
]);

const ParaglindersTable: React.FC<IParaglindersTableProps> = ({
  loading,
  paraglinders,
  pagination,
  error,
  onSort,
  onNextPage,
  onPrevPage,
  onRowChange,
  onDelete,
}) => {
  if (loading) return <Loading />;

  return (
    <div>
      <Table
        pagination={pagination}
        data={paraglinders}
        error={error}
        onSort={onSort}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        columnLabels={COLUMN_LABELS}
        onRowChange={onRowChange}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ParaglindersTable;
