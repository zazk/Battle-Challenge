import { runInAction, makeAutoObservable } from 'mobx';
export default class ShipDef {
  constructor(large = 1, isVertical = true, x = 0, y = 0) {
    this.large = large;
    this.isVertical = isVertical;
    this.x = x;
    this.y = y;
    this.shots = Array(large).fill(false);
    makeAutoObservable(this);
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isInPosition(x, y) {
    return this.isVertical
      ? y === this.y && x >= this.x && x <= this.x + this.large - 1
      : x === this.x && y >= this.y && y <= this.y + this.large - 1;
  }

  setShot(x, y) {
    if (this.isInPosition(x, y)) {
      console.log('me dieroooonnn!!!');
      const shotPosition = this.isVertical ? this.y - y : this.x - x;
      this.shots[shotPosition] = true;
    }
    return this.isSunk;
  }

  get isSunk() {
    return this.shots.every(Boolean);
  }
}
