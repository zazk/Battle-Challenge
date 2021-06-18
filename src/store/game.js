import { makeAutoObservable } from 'mobx';
import { BehaviorSubject, Subscription } from 'rxjs';
import randomPosition from '../utils/randomPosition';
import Ship from '../utils/ShipData';
import Shot from '../utils/Shot';
import { v4 as uuidv4 } from 'uuid';

const createShipsData = (boardSize) => {
  // boolean[10][10]
  const indices = Array(boardSize)
    .fill(undefined)
    .map(() => Array(boardSize).fill(false));
  const newPostions = [];

  for (let i = 0; i < 10; i++) {
    let large = 0;
    let isInvalid = false;
    let vertical = !!(Math.floor(Math.random() * 5) % 2);

    if (i < 4) large = 1;
    else if (i < 7) large = 2;
    else if (i < 9) large = 3;
    else large = 4;

    const { x, y } = randomPosition({
      x: boardSize - large,
      y: boardSize - large,
    });

    for (let o = 0; o < large; o++)
      if (!isInvalid) {
        isInvalid = vertical ? indices[x][y + o] : indices[x + o][y];
      }

    if (!isInvalid) {
      newPostions.push({ x, y, large, vertical });
      for (let o = 0; o < large; o++) {
        if (vertical) indices[x][y + o] = true;
        else indices[x + o][y] = true;
      }
    } else i--;
  }
  return newPostions;
};

export default class GameStore {
  constructor() {
    this.isGaming = false;
    this.shots = new Map();
    this.isUserTurn = false;
    this.userShips = [];
    this.computerShips = [];
    this.boardSize = 10;
    this.userShipsAlive = 0;
    this.computerShipsAlive = 0;
    this.userId = uuidv4();
    this.computerId = uuidv4();

    makeAutoObservable(this, {
      _subscriptions: false,
      _shostStream: false,
    });
  }

  shotSubscribe(subscriber) {
    return this._shostStream.subscribe(subscriber);
  }

  shotAcerted(shipSunk, shotId) {
    const shot = this.shots.get(shotId);
    if (shot) shot.setHit(true);
    if (shipSunk) {
      console.log('barco undidoooooo!!!!!');
      if (shot.userId === this.userId) this.computerShipsAlive--;
      else this.userShipsAlive--;
    }
  }

  _shot(x, y, userId) {
    const shot = new Shot(x, y, userId);
    if (this.shots.has(shot.id)) throw new Error('shot already exist!');
    this.shots.set(shot.id, shot);
    this._shostStream.next(shot.toJSON());
  }

  makeUserShot(x, y) {
    this._shot(x, y, this.userId);
  }
  async makeComputerShot() {
    try {
      console.log('makeComputerShot');
      const { x, y } = randomPosition({
        x: this.boardSize - 1,
        y: this.boardSize - 1,
      });
      this._shot(x, y, this.computerId);
    } catch (e) {
      console.error(e);
      await new Promise((r) => setTimeout(r, 100));
      await this.makeComputerShot();
    }
  }

  newGame() {
    if (!this.isGaming) {
      this._shostStream = new BehaviorSubject([]);
      this._subscriptions = new Subscription();
      this.shots.clear();
      this.userShips.clear();
      this.computerShips.clear();
      this.userShipsAlive = 10;
      this.computerShipsAlive = 10;

      createShipsData(this.boardSize).forEach((data) => {
        const ship = new Ship(
          data.large,
          data.vertical,
          data.x,
          data.y,
          this.userId
        );
        this.userShips.push(ship);
        this._subscriptions.add(Ship.subscribeToGameShots(ship, this));
      });

      createShipsData(this.boardSize).forEach((data) => {
        const ship = new Ship(
          data.large,
          data.vertical,
          data.x,
          data.y,
          this.computerId
        );
        this.computerShips.push(ship);
        this._subscriptions.add(Ship.subscribeToGameShots(ship, this));
      });

      this.isUserTurn = true;
      this.isGaming = true;

      return () => this.endGame();
    }
  }

  endGame() {
    if (this.isGaming) {
      this.game?.endGame();
      this._shostStream.complete();
      this._subscriptions.unsubscribe();
      this._subscriptions = null;
    }
  }

  nextTurn() {
    if (this.isGaming) {
      this.isUserTurn = !this.isUserTurn;
    }
  }

  get shotsAsArray() {
    return [...this.shots.values()];
  }

  get currentUserId() {
    return this.isUserTurn ? this.userId : this.computerId;
  }
}
