/* globals describe, test,jest, expect */
import { Ship } from './ShipData';

describe('ShipData', () => {
  test('default Values', () => {
    const ship = new Ship();

    expect(ship.large).toEqual(1);
    expect(ship.isVertical).toBe(true);
    expect(ship.x).toEqual(0);
    expect(ship.y).toEqual(0);
    expect(ship.shots).toHaveLength(1);
    expect(ship.shots[0]).toBe(false);
    expect(ship.id).not.toBeUndefined();
    expect(ship.useId).toBeUndefined();

    expect(ship.isSunk).toBe(false);

    expect(ship.isInPosition(0, 0)).toBe(true);
    expect(ship.isInPosition(0, 1)).toBe(false);
  });
});
