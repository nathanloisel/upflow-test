import * as React from 'react';
import TableBody from './body';
import TableFooter from './footer';
import TableHeader from './header';
import { StyledTable } from './style';

export interface IPagination {
  total: number;
  pageCount: number;
  currentPage: number;
}

export type SupportedEnumType = number | string;
export interface RangeColumnDefinition {
  type: 'range';
  range: [number, number];
  rangeStep: number;
}
export type ColumnDefinition = { title: string; editable: boolean } & (
  | { type: 'string' }
  | { type: 'integer' }
  | { type: 'float' }
  | { type: 'enum'; enum: SupportedEnumType[] }
  | RangeColumnDefinition
);

export interface ITableProps<T> {
  pagination?: IPagination;
  data?: Array<T>;
  error?: any;
  onSort: (columnName: keyof T) => void;
  onNextPage: VoidFunction;
  onPrevPage: VoidFunction;
  columnLabels: Map<keyof T, ColumnDefinition>;
  onDelete?: (index: number) => void;
  onRowChange: (index: number, newData: T) => void;
}

function Table<T>({
  data,
  error,
  onNextPage,
  onPrevPage,
  pagination,
  onSort,
  columnLabels,
  onDelete,
  onRowChange,
}: ITableProps<T>) {
  return (
    <StyledTable>
      <TableHeader
        onSort={onSort}
        columnLabels={columnLabels}
        hasActions={!!onDelete}
      />
      <TableBody
        data={data}
        error={error}
        onDelete={onDelete}
        onRowChange={onRowChange}
        columnLabels={columnLabels}
      />
      <TableFooter
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        pagination={pagination}
      />
    </StyledTable>
  );
}

export default Table;
