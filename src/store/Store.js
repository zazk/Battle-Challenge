import { makeAutoObservable } from 'mobx';
import Game from './Game';
import Config from './Config';
import History from './History';

export default class Store {
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
    const game = new Game();
    game.gameStatusObervable.subscribe(() => {
      this.history.addNewItem({
        ...game.gameData,
        name: this.config.name,
      });
      this.game = null;
    });
    game.startGame();
    this.game = game;
  }
}
