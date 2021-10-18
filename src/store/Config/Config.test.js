/* globals describe, test, jest, expect */
import { Config } from './Config';

test('Config Store', () => {
  const config = new Config();

  expect(config.name).toBe('');
  config.setName('test');
  expect(config.name).toBe('test');

  expect(config.level).toBe(0);
  expect(config.levelIsEasy).toBe(true);
  expect(config.levelIsMedium).toBe(false);
  expect(config.levelIsHard).toBe(false);

  config.setLevel(1);
  expect(config.level).toBe(1);
  expect(config.levelIsEasy).toBe(false);
  expect(config.levelIsMedium).toBe(true);
  expect(config.levelIsHard).toBe(false);

  config.setLevel(2);
  expect(config.level).toBe(2);
  expect(config.levelIsEasy).toBe(false);
  expect(config.levelIsMedium).toBe(false);
  expect(config.levelIsHard).toBe(true);
});
