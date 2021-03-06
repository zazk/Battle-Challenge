import { makeAutoObservable } from 'mobx';
import { BehaviorSubject, AsyncSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import createShipsData from '../../utils/createShipsData';
import Ship from '../../utils/ShipData';
import Shot from '../../utils/Shot';
import { v4 as uuidv4 } from 'uuid';

export class Game {
  constructor(level = 0) {
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
    this.level = level;
    this.startDate = null;
    this.endDate = null;
    this.currentUserAvalilableShots = 0;

    this.userId = uuidv4();
    this.computerId = uuidv4();

    this.gameStatusObervable = new AsyncSubject();
    this._shostStream = new BehaviorSubject();
    this._subscriptions = new Subscription();

    createShipsData(this.boardSize).forEach((data) => {
      const ship = new Ship(data.large, data.vertical, data.x, data.y, this.userId);
      this.userShips.push(ship);
      this._subscriptions.add(Ship.subscribeToGameShots(ship, this));
    });

    createShipsData(this.boardSize).forEach((data) => {
      const ship = new Ship(data.large, data.vertical, data.x, data.y, this.computerId);
      this.computerShips.push(ship);
      this._subscriptions.add(Ship.subscribeToGameShots(ship, this));
    });

    makeAutoObservable(this, {
      _subscriptions: false,
      _shostStream: false,
      gameStatusObervable: false,
    });
  }

  get isGameOver() {
    return !!this.endDate;
  }

  shotSubscribe(subscriber) {
    return this._shostStream.pipe(filter((value) => !!value)).subscribe(subscriber);
  }

  shotAcerted(shipSunk, shotId) {
    const shot = this.shots.get(shotId);
    if (shot) shot.setHit(true);
    if (shipSunk) {
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
    this.currentUserAvalilableShots--;
  }

  makeComputerShot(x, y) {
    this._shot(x, y, this.computerId);
    this.currentUserAvalilableShots--;
  }

  startGame() {
    this.isUserTurn = true;
    this.isGaming = true;
    this.startDate = new Date();
    this.currentUserAvalilableShots = 1;
  }

  endGame() {
    if (this.isGaming) {
      this.endDate = new Date();
      this.isGaming = false;
      this._shostStream.complete();
      this._subscriptions.unsubscribe();
      this.gameStatusObervable.next(this.gameData);
      this.gameStatusObervable.complete();
      return this.gameData;
    }
  }

  pausePlayGame() {
    this.isPaused = !this.isPaused;
  }

  nextTurn() {
    if (this.isGaming) {
      this.isUserTurn = !this.isUserTurn;
      this.currentUserAvalilableShots = 1;
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
      userWins: !this.isGaming && this.userShipsAlive > this.computerShipsAlive,
      level: this.level,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  squareIsDisabled(x, y) {
    return (
      this.shots.has(Shot.createId(x, y, this.userId)) ||
      !this.isGaming ||
      this.isPaused ||
      !this.isUserTurn ||
      this.currentUserAvalilableShots === 0
    );
  }
}
