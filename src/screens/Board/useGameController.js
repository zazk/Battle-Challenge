import { useEffect } from 'react';
import { reaction, autorun } from 'mobx';
// import randomPosition from '../../utils/randomPosition';
import useAutorunWithSubscription from '../../hooks/useAutorunWIthSubscription';

const useGameController = (store) => {
  useEffect(() => {
    store.newGame();
    return () => store.isGaming && store.game.endGame();
  }, []);

  useEffect(
    () =>
      autorun(async () => {
        const isComputerTurn =
          store.game.isGaming && !store.game.isUserTurn && !store.game.isPaused;

        if (isComputerTurn) await store.game.makeComputerShot();
      }),
    []
  );

  useEffect(
    () =>
      reaction(
        () => [store.game.userShipsAlive, store.game.computerShipsAlive],
        ([userShipsAlive, computerShipsAlive]) => {
          console.log(userShipsAlive, computerShipsAlive);
          if (!userShipsAlive || !computerShipsAlive) {
            store.game.endGame();
          }
        }
      ),
    []
  );

  // change turn automaticaly
  useAutorunWithSubscription(() =>
    store.game.shotSubscribe((shot) => {
      if (shot) setTimeout(() => store.game.nextTurn(), 1000);
    })
  );
};
// useEffect(
//   () =>
//     reaction(
//       () => [store.game.isGaming, store.game.isUserTurn, store.game.isPaused],
//       async ([isGaming, isUserTurn, isPaused]) => {
//         if (isGaming && isUserTurn && !isPaused) {
//           const idk = async () => {
//             try {
//               console.log('makeUserGame');
//               const { x, y } = randomPosition({
//                 x: store.game.boardSize,
//                 y: store.game.boardSize,
//               });
//
//               store.game.makeUserShot(x, y);
//             } catch (e) {
//               console.error(e.message);
//               await new Promise((r) => setTimeout(r, 300));
//               await idk();
//             }
//           };
//           console.groupCollapsed('UserTurn');
//           await idk();
//           console.groupEnd();
//           setTimeout(() => store.game.nextTurn(), 1000);
//         }
//       }
//     ),
//   []
// );

export default useGameController;
