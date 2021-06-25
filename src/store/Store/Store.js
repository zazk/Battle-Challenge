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
    this.game = new Game(this.config.level);
    const subscription = this.game.gameStatusObervable.subscribe({
      complete: () => {
        subscription.unsubscribe();
      },
      next: (gameData) => {
        this.history.addNewItem({
          ...gameData,
          name: this.config.name,
        });
      },
    });
  }
}
