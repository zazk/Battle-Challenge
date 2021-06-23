import { makeAutoObservable } from 'mobx';
import Game from '../Game';
import Config from '../Config';
import History from '../History';

export class Store {
  constructor() {
    this.game = null;
    this.history = new History();
    this.config = new Config();

    makeAutoObservable(this);
  }

  get isGaming() {
    return !!this.game;
  }

  newGame() {
    const game = new Game(this.config.level);
    game.gameStatusObervable.subscribe((stats) => {
      this.history.addNewItem({
        ...stats,
        name: this.config.name,
      });
      this.game = null;
    });
    game.startGame();
    this.game = game;
  }
}
