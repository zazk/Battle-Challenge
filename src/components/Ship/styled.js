import styled from 'styled-components/macro';

export const Ship = styled('div')`
  grid-column: ${({ x }) => x + 1} / span
    ${({ large, vertical }) => (!vertical && large) || 1};
  grid-row: ${({ y }) => y + 1} / span
    ${({ large, vertical }) => (vertical && large) || 1};
  background: ${({ large, isSunk }) => {
    if (isSunk) return '#555';
    if (large === 1) return 'red';
    if (large === 2) return 'blue';
    if (large === 3) return 'green';
    if (large === 4) return 'yellow';
    return 'black';
  }};
  border: 10px solid #0005;
  border-radius: 20px;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  align-self: center;
  justify-self: center;
  pointer-events: none;
  ${({ visible = true }) => (!visible ? 'display:none;' : '')}
`;
