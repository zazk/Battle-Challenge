/* globals describe, test,jest, expect,afterAll */
import { createShipsData } from './createShipsData';

test('util | createShipsData()', () => {
  const boardSize = 10;
  const indexGrid = Array(boardSize)
    .fill(undefined)
    .map(() => Array(boardSize).fill(false));

  const ships = createShipsData(boardSize);

  expect(ships).toHaveLength(10);

  for (const ship of ships) {
    expect(ship).toEqual({
      x: expect.toBeWithinRange(0, boardSize - 1),
      y: expect.toBeWithinRange(0, boardSize - 1),
      large: expect.toBeWithinRange(0, 4),
      vertical: expect.toBeBoolean(),
    });

    const { x, y, large, vertical } = ship;

    for (let i = 0; i < large; i++) {
      if (vertical) {
        expect(indexGrid[x][y + i]).toBe(false);
      } else {
        expect(indexGrid[x + i][y]).toBe(false);
      }
    }
    indexGrid[x][y] = true;
  }
});
