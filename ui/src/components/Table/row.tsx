import * as React from 'react';
import { ColumnDefinition } from '.';
import TableCell from './cell';

export interface ITableRowProps<T> {
  index: number;
  rowData: T;
  onDelete?: (index: number) => void;
  onRowChange: (index: number, newData: T) => void;
  columnLabels: Map<keyof T, ColumnDefinition>;
}

function TableRow<T>({
  index,
  rowData,
  onDelete,
  onRowChange,
  columnLabels,
}: ITableRowProps<T>) {
  const onDeleteClicked = React.useCallback(() => {
    onDelete && onDelete(index);
  }, [onDelete, index]);

  const onValueChange = React.useCallback(
    (key: any, value: string | number | undefined) => {
      onRowChange(index, { ...rowData, [key]: value });
    },
    [onRowChange, rowData, index]
  );

  return (
    <tr>
      {Array.from(columnLabels.entries()).map(([key, colDef]) => (
        <TableCell
          // @ts-ignore
          value={rowData[key]}
          key={`${index}${key.toString()}`}
          cellKey={key as keyof T}
          onValueChange={onValueChange}
          colDef={colDef}
        />
      ))}
      {onDelete && (
        <td>
          <button onClick={onDeleteClicked}>&#215;</button>
        </td>
      )}
    </tr>
  );
}

export default TableRow;
