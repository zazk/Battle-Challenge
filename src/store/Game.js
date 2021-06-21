import { makeAutoObservable } from 'mobx';
import { BehaviorSubject, AsyncSubject, Subscription } from 'rxjs';
import randomPosition from '../utils/randomPosition';
import createShipsData from '../utils/createShipsData';
import Ship from '../utils/ShipData';
import Shot from '../utils/Shot';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default class GameStore {
  constructor() {
    this.id = uuidv4();

    this.isGameReady = false;
    this.isGaming = false;
    this.isPaused = false;
    this.shots = new Map();
    this.isUserTurn = false;
    this.userShips = [];
    this.computerShips = [];
    this.boardSize = 10;
    this.userShipsAlive = 10;
    this.computerShipsAlive = 10;

    this.userId = uuidv4();
    this.computerId = uuidv4();

    this.gameStatusObervable = new AsyncSubject();
    this._shostStream = new BehaviorSubject([]);
    this._subscriptions = new Subscription();

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

    makeAutoObservable(this, {
      _subscriptions: false,
      _shostStream: false,
      gameStatusObervable: false,
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
      const { x, y } = randomPosition({
        x: this.boardSize,
        y: this.boardSize,
      });
      this._shot(x, y, this.computerId);
    } catch (e) {
      console.error(e);
      await new Promise((r) => setTimeout(r, 1000));
      await this.makeComputerShot();
    }
  }

  startGame() {
    this.isUserTurn = true;
    this.isGaming = true;
  }

  endGame() {
    if (this.isGaming) {
      this.isGaming = false;
      this._shostStream.complete();
      this._subscriptions.unsubscribe();
      this._subscriptions = null;
      this.gameStatusObervable.next();
      this.gameStatusObervable.complete();
    }
  }

  pausePlayGame() {
    this.isPaused = !this.isPaused;
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

  get gameData() {
    return {
      id: this.id,
      win: false,
      date: moment().format('L h:mm a'),
    };
  }
}
