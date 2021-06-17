import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export default class Ship {
  constructor(large = 1, isVertical = true, x = 0, y = 0, useId) {
    this.large = large;
    this.isVertical = isVertical;
    this.x = x;
    this.y = y;
    this.shots = Array(large).fill(false);
    this.id = uuidv4();
    this.useId = useId;
    makeAutoObservable(this);
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isInPosition(x, y) {
    return this.isVertical
      ? x === this.x && y >= this.y && y <= this.y + this.large - 1
      : y === this.y && x >= this.x && x <= this.x + this.large - 1;
  }

  setShot(x, y) {
    if (this.isInPosition(x, y)) {
      console.log('me dieroooonnn!!!');
      const shotPosition = this.isVertical ? y - this.y : x - this.x;
      this.shots[shotPosition] = true;
    }
    return this.isSunk;
  }

  get isSunk() {
    return this.shots.every(Boolean);
  }

  static subscribeToGameShots(ship, game) {
    return game.shotSubscribe(({ x, y, userId, id }) => {
      if (userId !== ship.useId && ship.isInPosition(x, y)) {
        game.shotAcerted(ship.setShot(x, y), id);
      }
    });
  }
}
