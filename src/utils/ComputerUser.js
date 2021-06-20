import randomPosition from '../utils/randomPosition';

export default class ComputerUser {
  constructor(level = 1) {
    this.level = level;
  }

  async makeShot(dispatch) {
    try {
      console.log('makeComputerShot');
      const { x, y } = randomPosition({
        x: this.boardSize,
        y: this.boardSize,
      });
      dispatch(x, y);
    } catch (e) {
      console.error(e);
      await new Promise((r) => setTimeout(r, 1000));
      await this.makeShot(dispatch);
    }
  }
}
