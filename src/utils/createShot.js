import randomPosition from '../utils/randomPosition';

export default async function createShot(level, boardSize, dispatch) {
  // TODO: make shot by level (medium and hard)
  try {
    console.groupCollapsed('Computed Shot');
    const { x, y } = randomPosition({
      x: boardSize,
      y: boardSize,
    });
    dispatch(x, y);
  } catch (e) {
    console.error(e);
    await new Promise((r) => setTimeout(r, 1000));
    await createShot(level, boardSize, dispatch);
  }
  console.groupEnd();
}
