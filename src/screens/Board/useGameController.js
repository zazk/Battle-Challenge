import { useEffect } from 'react';
import useAutorunWithSubscription from '../../hooks/useAutorunWithSubscription';
import useAutorun from '../../hooks/useAutorun';
import createShot from '../../utils/createShot';

const useGameController = (store) => {
  useEffect(() => {
    store.newGame();
    return () => store.isGaming && store.game.endGame();
  }, []);

  useAutorun(async () => {
    const isComputerTurn =
      store.game.isGaming && !store.game.isUserTurn && !store.game.isPaused;

    if (isComputerTurn) {
      setTimeout(() => {
        createShot(store.level, store.boardSize, (...v) =>
          store.game.makeComputerShot(...v)
        );
      }, 600);
    }
  });

  useAutorun(() => {
    if (!store.game.userShipsAlive || !store.game.computerShipsAlive) {
      store.game.endGame();
    }
  });

  // change turn automaticaly
  useAutorunWithSubscription(() =>
    store.game.shotSubscribe(() => {
      setTimeout(() => store.game.nextTurn(), 1000);
    })
  );
};

export default useGameController;
