/* globals describe, test, jest, expect */

import { Game } from './Game';
import Shot from '../../utils/Shot';
import Ship from '../../utils/ShipData';
import { ObservableMap } from 'mobx';

test('Game  ship data', () => {
  const game = new Game();

  expect(game.id).toEqual(expect.any(String));
  expect(game.isGameReady).toBe(false);
  expect(game.isGaming).toBe(false);
  expect(game.isPaused).toBe(false);
  expect(game.isUserTurn).toBe(false);
  expect(game.boardSize).toEqual(10);
  expect(game.userShipsAlive).toEqual(10);
  expect(game.computerShipsAlive).toEqual(10);
  expect(game.userId).toEqual(expect.any(String));
  expect(game.computerId).toEqual(expect.any(String));

  const endGameSubscriber = jest.fn();
  game.gameStatusObervable.subscribe(endGameSubscriber);
  expect(endGameSubscriber).toBeCalledTimes(0);

  expect(game.shots).toBeInstanceOf(ObservableMap);
  expect(game.shots).toHaveProperty('size', 0);

  expect(game.userShips).toBeInstanceOf(Array);
  expect(game.userShips).toHaveLength(10);
  for (const ship of game.userShips) expect(ship).toBeInstanceOf(Ship);

  expect(game.computerShips).toBeInstanceOf(Array);
  expect(game.computerShips).toHaveLength(10);
  for (const ship of game.computerShips) expect(ship).toBeInstanceOf(Ship);

  game.startGame();

  expect(game.isUserTurn).toBe(true);
  expect(game.isGaming).toBe(true);

  game.pausePlayGame();
  expect(game.isPaused).toBe(true);
  game.pausePlayGame();
  expect(game.isPaused).toBe(false);

  game.nextTurn();
  expect(game.isUserTurn).toBe(false);
  expect(game.currentUserId).toBe(game.computerId);
  game.nextTurn();
  expect(game.isUserTurn).toBe(true);
  expect(game.currentUserId).toBe(game.userId);

  const userShip = game.userShips.find(({ large }) => large === 1);
  game._shot(userShip.x, userShip.y, game.computerId);
  expect(userShip.shots[0]).toBe(true);
  expect(userShip.isSunk).toBe(true);
  expect(game.userShipsAlive).toEqual(9);

  const computerShip = game.computerShips.find(({ large }) => large === 1);
  game._shot(computerShip.x, computerShip.y, game.userId);
  expect(computerShip.shots[0]).toBe(true);
  expect(computerShip.isSunk).toBe(true);
  expect(game.computerShipsAlive).toEqual(9);

  const stats = game.endGame();
  expect(game.isGaming).toBe(false);
  expect(stats).toEqual({
    id: expect.any(String),
    userWins: false,
    date: expect.any(Date),
  });
  expect(endGameSubscriber).toBeCalledTimes(1);
  expect(endGameSubscriber).toBeCalledWith(stats);
});

test('Game shot', () => {
  const game = new Game();
  expect(game.shots).toHaveProperty('size', 0);
  game.makeUserShot(0, 0);

  expect(game.shots).toHaveProperty('size', 1);

  expect(game.shotsAsArray).toEqual([...game.shots.values()]);

  expect(game.shotsAsArray[0]).toBeInstanceOf(Shot);

  const shotToCompare = new Shot(0, 0, game.userId);
  expect(game.shotsAsArray[0]).toEqual(shotToCompare);
});
test('Game shot subscription', () => {
  const game = new Game();

  const shotSubriber = jest.fn();
  const subscription = game.shotSubscribe(shotSubriber);

  expect(shotSubriber).toBeCalledTimes(1);
  expect(shotSubriber).toBeCalledWith(undefined);

  game.makeUserShot(0, 0);

  expect(shotSubriber).toBeCalledTimes(2);
  expect(shotSubriber).toBeCalledWith(
    expect.objectContaining({
      x: 0,
      y: 0,
      hit: false,
      userId: game.userId,
      id: expect.any(String),
    })
  );

  subscription.unsubscribe();
  expect(shotSubriber).toBeCalledTimes(2);
});
test('Game subscription after shot ', () => {
  const game = new Game();

  game.makeUserShot(0, 0);

  const shotSubriber = jest.fn();
  const subscription = game.shotSubscribe(shotSubriber);

  expect(shotSubriber).toBeCalledTimes(1);
  expect(shotSubriber).toBeCalledWith(
    expect.objectContaining({
      x: 0,
      y: 0,
      hit: false,
      userId: game.userId,
      id: expect.any(String),
    })
  );

  subscription.unsubscribe();
  expect(shotSubriber).toBeCalledTimes(1);
});
