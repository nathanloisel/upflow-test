import * as React from 'react';

import { ColumnDefinition } from './';
import { SortHeaderButton, StyledHeaderCell } from './style';

export interface ITableHeaderProps<T> {
  columnLabels: Map<keyof T, ColumnDefinition>;
  onSort: (columnName: keyof T) => void;
  hasActions?: boolean;
}

function TableHeader<T>({
  columnLabels,
  onSort,
  hasActions,
}: ITableHeaderProps<T>) {
  return (
    <thead>
      <tr>
        {Array.from(columnLabels).map(([fieldName, { title }], i) => (
          <TableHeaderCell
            fieldName={fieldName}
            title={title}
            onClick={onSort}
            key={i}
          />
        ))}
        {hasActions && <th />}
      </tr>
    </thead>
  );
}

export default TableHeader;

interface ITableHeaderCellProps<T> {
  fieldName: T;
  title: string;
  onClick: (columnName: T) => void;
}

function TableHeaderCell<T>({
  fieldName,
  title,
  onClick,
}: ITableHeaderCellProps<T>) {
  const onSortClick = React.useCallback(() => {
    onClick(fieldName);
  }, [fieldName, onClick]);

  return (
    <th>
      <StyledHeaderCell>
        {title}{' '}
        <SortHeaderButton onClick={onSortClick}>&#8595;</SortHeaderButton>
      </StyledHeaderCell>
    </th>
  );
}
