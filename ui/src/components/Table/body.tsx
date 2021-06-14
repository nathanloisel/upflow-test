import * as React from 'react';
import TableRow from './row';
import Error from '../Error';
import { ColumnDefinition } from '.';

export interface ITableBodyProps<T> {
  data?: Array<T>;
  error?: any;
  onDelete?: (index: number) => void;
  onRowChange: (index: number, newData: T) => void;
  columnLabels: Map<keyof T, ColumnDefinition>;
}

function TableBody<T>({
  data,
  error,
  onDelete,
  onRowChange,
  columnLabels,
}: ITableBodyProps<T>) {
  let content;
  if (error) content = <Error error={'Error while loading table rows.'} />;
  else
    content = data?.map((d, i) => (
      <TableRow
        rowData={d}
        key={JSON.stringify(d)}
        index={i}
        onDelete={onDelete}
        onRowChange={onRowChange}
        columnLabels={columnLabels}
      />
    )) || (
      <tr>
        <td>
          <Error error="Unexpected error." />
        </td>
      </tr>
    );

  return <tbody>{content}</tbody>;
}

export default TableBody;
