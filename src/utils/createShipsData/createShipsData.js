import randomPosition from '../randomPosition';
import random from 'lodash.random';

export function createShipsData(boardSize) {
  // boolean[10][10]
  const indices = Array(boardSize)
    .fill(undefined)
    .map(() => Array(boardSize).fill(false));
  const newPostions = [];

  for (let i = 0; i < 10; i++) {
    let large = 0;
    let isInvalid = false;
    let vertical = !!random(1);

    if (i < 4) large = 1;
    else if (i < 7) large = 2;
    else if (i < 9) large = 3;
    else large = 4;

    const { x, y } = randomPosition({
      x: boardSize - large,
      y: boardSize - large,
    });

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
}
