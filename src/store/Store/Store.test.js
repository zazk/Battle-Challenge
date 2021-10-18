/* globals describe, test, jest, expect */

import { Store } from './Store';
import History from '../History';
import Config from '../Config';
import Game from '../Game';

test('Store Instance', () => {
  const store = new Store();

  expect(store.history).toEqual(expect.any(History));
  expect(store.config).toEqual(expect.any(Config));
  expect(store.game).toEqual(expect.any(Game));
});

test('Store Gaming functionality', () => {
  const store = new Store();

  expect(store.history.items).toEqual([]);
  expect(store.isGaming).toBe(false);

  store.game.startGame();

  expect(store.isGaming).toBe(true);

  const gameItem = store.game.endGame();
  expect(store.isGaming).toBe(false);

  const historyItem = {
    ...gameItem,
    name: store.config.name,
  };

  expect(store.history.items).toEqual([historyItem]);

  const gameInstance = store.game;
  store.newGame();

  expect(gameInstance).not.toBe(store.game);
  expect(gameInstance.id).not.toBe(store.game.id);
  expect(store.isGaming).toBe(false);
});
