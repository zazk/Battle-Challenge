import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class Config {
  constructor() {
    this.name = '';
    this.level = 0;

    makeAutoObservable(this);
    makePersistable(this, {
      name: 'BattleshipStore',
      properties: ['name', 'level'],
      storage: window.localStorage,
    });
  }

  setName(name) {
    this.name = name;
  }

  setLevel(level) {
    this.level = level;
  }

  get levelIsEasy() {
    return this.level === 0;
  }
  get levelIsMedium() {
    return this.level === 1;
  }
  get levelIsHard() {
    return this.level === 2;
  }
}
