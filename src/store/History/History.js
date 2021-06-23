import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class History {
  constructor() {
    this.items = [];

    makeAutoObservable(this);
    makePersistable(this, {
      name: 'BattleshipStore',
      properties: ['items'],
      storage: window.localStorage,
    });
  }

  addNewItem(data) {
    this.items.push(data);
  }

  removeItemById(id) {
    const index = this.items.findIndex(({ id: itemId }) => itemId === id);
    if (index > -1) this.items.splice(index, 1);
  }
}
