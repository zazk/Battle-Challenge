import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import Board from '../../components/Board';
import Ship from '../../components/Ship';
import useShot from '../../hooks/useShot';
import { Observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';

const Shot = styled('div')`
  grid-column: ${({ x }) => x + 1};
  grid-row: ${({ y }) => y + 1};
  background-color: ${({ acerted }) => (acerted ? 'blue' : 'red')};
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  align-self: center;
  justify-self: center;
  border-radius: 100%;
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

export const BoardScreen = () => {
  const [usePositions, setUserPositions] = useState([]);
  const [computerPosition, setComputerPosition] = useState([]);
  const [isUserTurn, setTurno] = useState(true);

  const [ids] = useState(() => ({
    computer: uuidv4(),
    user: uuidv4(),
  }));

  const shotContext = useShot();

  useEffect(() => setUserPositions(createShipsData()), []);
  useEffect(() => setComputerPosition(createShipsData()), []);

  const makeShot = useCallback(
    (x, y, user) => {
      shotContext.shot(x, y, user);
      setTimeout(() => {
        setTurno((s) => !s);
      }, 1000);
    },
    [shotContext, ids]
  );

  useEffect(() => {
    if (!isUserTurn) {
      const { x, y } = randomPosition({ x: 10, y: 10 });
      console.log('compute shot', x, y);
      makeShot(x, y, ids.computer);
    }
  }, [isUserTurn, makeShot, ids]);

  return (
    <div>
      <Board
        onSelectSquare={(...positions) => makeShot(...positions, ids.user)}
      >
        {
          // !isUserTurn &&
          usePositions.map(({ x, y, ...data }) => (
            <Ship x={x} y={y} {...data} key={`${x}-${y}`} />
          ))
        }
        {isUserTurn && (
          <>
            {
              //   computerPosition.map(({ x, y, ...data }) => (
              //   <Ship x={x + 1} y={y + 1} {...data} key={`${x}-${y}`} />
              // ))
            }

            <Observer>
              {() =>
                shotContext.shots.map(({ x, y, acerted, user }) =>
                  user === (isUserTurn ? ids.user : ids.computer) ? (
                    <Shot
                      key={`s-${x}-${y}`}
                      x={x + 1}
                      y={y + 1}
                      acerted={acerted}
                    />
                  ) : null
                )
              }
            </Observer>
          </>
        )}
      </Board>
    </div>
  );
};
