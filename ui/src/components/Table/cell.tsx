import SlidePopper from 'components/SlidePopper';
import * as React from 'react';
import { ColumnDefinition } from '.';

import { StyledCell, StyledInput } from './style';

export interface ITableCellProps<T> {
  cellKey: T;
  value: string | number | undefined;
  onValueChange: (key: T, value: string | number | undefined) => void;
  colDef: ColumnDefinition;
}

function TableCell<T>({
  cellKey,
  value,
  onValueChange,
  colDef,
}: ITableCellProps<T>) {
  const cellRef = React.useRef<HTMLTableDataCellElement | null>(null);
  const [inputValue, setInputValue] = React.useState(value);
  const [editable, setEditable] = React.useState(false);
  const showInput = React.useCallback(() => setEditable(true), [setEditable]);

  const onClickOutside = (e: MouseEvent) => {
    if (
      e.target &&
      e.target instanceof HTMLElement &&
      cellRef.current &&
      !cellRef.current.contains(e.target) &&
      editable
    ) {
      let newValue;
      if (typeof inputValue === 'string' && typeof value === 'number') {
        newValue =
          colDef.type === 'float'
            ? parseFloat(inputValue)
            : parseInt(inputValue);
      } else {
        newValue = inputValue;
      }
      onValueChange(cellKey, newValue);
      setEditable(false);
    }
  };

  useEvent('click', onClickOutside);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | number) => {
      if (typeof e === 'number') {
        setInputValue(e);
      } else if (e.target.validity.valid) {
        setInputValue(e.target.value);
      }
    },
    [setInputValue]
  );
  const Input = getInput(colDef, inputValue, onChange);

  return (
    <StyledCell onClick={showInput} ref={cellRef}>
      {editable ? Input : inputValue}
    </StyledCell>
  );
}

export default TableCell;

function getInput(
  colDef: ColumnDefinition,
  inputValue: string | number | undefined,
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | number
  ) => void
) {
  if (
    colDef.type === 'string' ||
    colDef.type === 'float' ||
    colDef.type === 'integer'
  )
    return (
      <StyledInput
        value={inputValue}
        onChange={onChange}
        autoFocus
        type="text"
        pattern={
          colDef.type === 'float'
            ? '[0-9]*(\\.[0-9]*){0,1}'
            : colDef.type === 'integer'
            ? '[0-9]*'
            : undefined
        }
      />
    );
  else if (colDef.type === 'enum')
    return (
      <select value={inputValue} onChange={onChange}>
        {colDef.enum.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    );
  else if (colDef.type === 'range')
    return (
      <SlidePopper
        onChange={onChange}
        inputValue={inputValue as number}
        colDef={colDef}
      />
    );
  else return null;
}

function useEvent(
  event: any,
  handler: (this: Document, ev: any) => any,
  passive = false
) {
  React.useEffect(() => {
    // initiate the event handler
    document && document.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      document && document.removeEventListener(event, handler);
    };
  });
}
