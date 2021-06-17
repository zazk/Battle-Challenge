import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from 'mobx';

export default class Shot {
  constructor(x, y, userId, hit = false) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.userId = userId;
    this.hit = hit;
    makeAutoObservable(this);
  }

  setHit(hit) {
    this.hit = hit;
  }

  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      userId: this.userId,
      hit: this.hit,
    };
  }
}
