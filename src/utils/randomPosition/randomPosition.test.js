/* globals describe, test, expect */
import { randomPosition } from './randomPosition';

test('randomPosition', () => {
  const values = randomPosition({ x: 10, y: 10 });

  expect(values.x).toBeGreaterThanOrEqual(0);
  expect(values.x).toBeLessThanOrEqual(10);
  expect(values.y).toBeGreaterThanOrEqual(0);
  expect(values.y).toBeLessThanOrEqual(10);

  const values2 = randomPosition({ x: 10, y: 10 });

  expect(values.x).toBeGreaterThanOrEqual(0);
  expect(values.x).toBeLessThanOrEqual(10);
  expect(values.y).toBeGreaterThanOrEqual(0);
  expect(values.y).toBeLessThanOrEqual(10);

  expect(values2.x).not.toEqual(values.x);
  expect(values2.y).not.toEqual(values.y);
});
