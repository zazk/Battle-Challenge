import { makeAutoObservable } from 'mobx';

export class Shot {
  constructor(x, y, userId, hit = false) {
    this.id = Shot.createId(x, y, userId);
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

  static createId(x, y, userId) {
    return `${userId}-${x}-${y}`;
  }
}
