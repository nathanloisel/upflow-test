import styled from 'styled-components';

export const StyledTable = styled.table`
  width: auto;
`;
export const StyledCell = styled.td`
  text-align: center;
`;
export const StyledInput = styled.input`
  width: 100%;
  text-align: center;
`;

export const StyledHeaderCell = styled.div`
  resize: horizontal;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  border: 1px solid black;
  display: block;
  &::-webkit-resizer {
    display: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SortHeaderButton = styled.button`
  margin-right: 15px;
`;
