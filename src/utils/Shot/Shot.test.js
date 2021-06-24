/* globals describe, test, jest, expect */
import { Shot } from './Shot';

test('Shot ID', () => {
  expect(Shot.createId(2, 2, 'usedID')).toBe('usedID-2-2');
});

test('Shot instance', () => {
  const shot = new Shot(2, 2, 'usedID');

  expect(shot.id).toBe('usedID-2-2');
  expect(shot.x).toEqual(2);
  expect(shot.y).toEqual(2);
  expect(shot.userId).toBe('usedID');
  expect(shot.hit).toBe(false);
});
