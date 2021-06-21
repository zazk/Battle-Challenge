import { makeAutoObservable } from 'mobx';
import Game from './Game';

export default class Store {
  constructor() {
    this.game = null;

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
