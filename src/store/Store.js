import { makeAutoObservable } from 'mobx';
import Game from './Game';
import Config from './Config';

export default class Store {
  constructor() {
    this.game = null;
    this.config = new Config();

    makeAutoObservable(this);
  }

  get isGaming() {
    return !!this.game;
  }

  newGame() {
    const game = new Game();
    game.gameStatusObervable.subscribe(() => {
      this.game = null;
    });
    game.startGame();
    this.game = game;
  }
}
