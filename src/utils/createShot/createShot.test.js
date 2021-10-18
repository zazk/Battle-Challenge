/* globals describe, test, jest, expect, afterEach */
jest.mock('../../utils/randomPosition');

import { createShot } from './createShot';
import randomPosition from '../../utils/randomPosition';

describe('creatShot util', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('creatShot util', async () => {
    jest.useFakeTimers();

    const dispatch = jest.fn();
    const boardSize = Symbol('test value');
    const positionMock = { x: 5, y: 5 };

    let times = 1;
    randomPosition.mockImplementation(() => {
      if (0 < times--) throw new Error('temporal error');
      return positionMock;
    });

    const createShotPosition = createShot(0, boardSize, dispatch);

    expect(randomPosition).toHaveBeenCalledTimes(1);
    expect(randomPosition).toHaveBeenLastCalledWith({ x: boardSize, y: boardSize });

    expect(dispatch).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runAllTimers();

    await createShotPosition;

    expect(randomPosition).toHaveBeenCalledTimes(2);
    expect(randomPosition).toHaveBeenLastCalledWith({ x: boardSize, y: boardSize });

    expect(dispatch).toHaveBeenLastCalledWith(positionMock.x, positionMock.y);
  });
});
