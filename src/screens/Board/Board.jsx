import { useEffect, useState } from 'react';
import styled from 'styled-components';
import range from 'lodash.range';

const Root = styled('section')`
  display: grid;
  grid-template-rows: auto repeat(10, 1fr);
  grid-template-columns: auto repeat(10, 1fr);
  max-height: 80vh;
  max-width: 80vh;
  padding: 10px;
`;

const Ship = styled('div')`
  grid-column: ${({ x }) => x + 1} / span
    ${({ large, vertical }) => (!vertical && large) || 1};
  grid-row: ${({ y }) => y + 1} / span
    ${({ large, vertical }) => (vertical && large) || 1};
  background: ${({ large }) => {
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
`;

const Square = styled('div')`
  outline: 1px solid;
  aspect-ratio: 1 / 1;
  grid-column: ${({ x }) => x + 2};
  grid-row: ${({ y }) => y + 2};
`;

const BorderSquare = styled('div')`
  outline: 1px solid;
  grid-column: ${({ x }) => x ?? 1};
  grid-row: ${({ y }) => y ?? 1};
  display: grid;
  align-items: center;
  justify-items: center;
  min-width: 40px;
  min-height: 40px;
`;

const randomPosition = ({ x = 9, y = 9 } = {}) => ({
  x: Math.floor(Math.random() * x) + 1,
  y: Math.floor(Math.random() * y) + 1,
});

const createShipsData = () => {
  // boolean[10][10]
  const indices = Array(10)
    .fill(undefined)
    .map(() => Array(10).fill(false));
  const newPostions = [];

  for (let i = 0; i < 10; i++) {
    let large = 0;
    let isInvalid = false;
    let vertical = !!Math.floor(Math.random() * 5) % 2;

    if (i < 4) large = 1;
    else if (i < 7) large = 2;
    else if (i < 9) large = 3;
    else large = 4;

    const { x, y } = randomPosition({ x: 10 - large, y: 10 - large });

    for (let o = 0; o < large; o++)
      if (!isInvalid) {
        isInvalid = vertical ? indices[x][y + o] : indices[x + o][y];
      }

    if (!isInvalid) {
      newPostions.push({ x, y, large, vertical });
      for (let o = 0; o < large; o++) {
        if (vertical) indices[x][y + o] = true;
        else indices[x + o][y] = true;
      }
    } else i--;
  }
  return newPostions;
};

export const Board = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => setPositions(createShipsData()), []);

  return (
    <Root>
      {range(100).map((idx) => (
        <Square key={idx} x={idx % 10} y={(idx / 10) | 0} />
      ))}

      {range(10).map((idx) => (
        <BorderSquare key={`border-row-${idx}`} y={idx + 2} x={1}>
          {idx}
        </BorderSquare>
      ))}
      {range(10).map((idx) => (
        <BorderSquare key={`border-column-${idx}`} x={idx + 2} y={1}>
          {String.fromCharCode(65 + idx)}
        </BorderSquare>
      ))}

      {positions.map(({ x, y, ...data }) => (
        <Ship x={x + 1} y={y + 1} {...data} key={`${x}-${y}`} />
      ))}
    </Root>
  );
};
