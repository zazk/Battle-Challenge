import styled from 'styled-components/macro';

export const Root = styled('section')`
  display: grid;
  grid-template-rows: auto repeat(10, 1fr);
  grid-template-columns: auto repeat(10, 1fr);
  max-height: 80vh;
  max-width: 80vh;
  padding: 10px;
`;

export const Square = styled('button')`
  outline: 1px solid;
  aspect-ratio: 1 / 1;
  grid-column: ${({ x }) => x + 2};
  grid-row: ${({ y }) => y + 2};
  border: none;
  background-color: transparent;
  &:hover {
    background-color: #0002;
  }
  &:active {
    background-color: #0004;
  }
`;

export const BorderSquare = styled('div')`
  outline: 1px solid;
  grid-column: ${({ x }) => x ?? 1};
  grid-row: ${({ y }) => y ?? 1};
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 40px;
  min-height: 40px;
`;
