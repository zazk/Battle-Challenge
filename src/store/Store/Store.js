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

    this.newGame();
  }

  get isGaming() {
    return !!this.game?.isGaming;
  }

  newGame() {
    const game = new Game(this.config.level);
    game.gameStatusObervable.subscribe((stats) => {
      this.history.addNewItem({
        ...stats,
        name: this.config.name,
      });
    });
    // game.startGame();
    this.game = game;
  }
}
