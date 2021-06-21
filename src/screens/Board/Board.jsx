import { useEffect, useCallback } from 'react';
import Ship from '../../components/Ship';
import Shot from '../../components/Shot';
import Board from '../../components/Board';
import GameControl from '../../components/GameControl';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import randomPosition from '../../utils/randomPosition';
import { useStore } from '../../store';

const Game = observer(({ game }) => {
  useEffect(
    () =>
      reaction(
        () => [game.isGaming, game.isUserTurn, game.isPaused],
        async ([isGaming, isUserTurn, isPaused]) => {
          if (isGaming && !isUserTurn && !isPaused) {
            console.groupCollapsed('ComputerTurn');
            await game.makeComputerShot();
            console.groupEnd();
            setTimeout(() => game.nextTurn(), 1000);
          }
        }
      ),
    []
  );

  useEffect(
    () =>
      reaction(
        () => [game.userShipsAlive, game.computerShipsAlive],
        ([userShipsAlive, computerShipsAlive]) => {
          console.log(userShipsAlive, computerShipsAlive);
          if (!userShipsAlive || !computerShipsAlive) {
            game.endGame();
          }
          if (!userShipsAlive) {
            console.log('ganó la PC!!!!');
          } else if (!computerShipsAlive) {
            console.log('ganó el usuario!!!!');
          }
        }
      ),
    []
  );

  const onUserShot = useCallback((x, y) => {
    try {
      if (game.isUserTurn) {
        game.makeUserShot(x, y);
        setTimeout(() => game.nextTurn(), 1000);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // useEffect(
  //   () =>
  //     reaction(
  //       () => [game.isGaming, game.isUserTurn, game.isPaused],
  //       async ([isGaming, isUserTurn, isPaused]) => {
  //         if (isGaming && isUserTurn && !isPaused) {
  //           const idk = async () => {
  //             try {
  //               console.log('makeUserGame');
  //               const { x, y } = randomPosition({
  //                 x: game.boardSize,
  //                 y: game.boardSize,
  //               });
  //
  //               game.makeUserShot(x, y);
  //             } catch (e) {
  //               console.error(e.message);
  //               await new Promise((r) => setTimeout(r, 300));
  //               await idk();
  //             }
  //           };
  //           console.groupCollapsed('UserTurn');
  //           await idk();
  //           console.groupEnd();
  //           setTimeout(() => game.nextTurn(), 1000);
  //         }
  //       }
  //     ),
  //   []
  // );
  return (
    <div
      style={{
        height: 'calc(40vw + 40px + 61px)',
        width: '40vw',
        margin: '0 auto',
      }}
    >
      <GameControl game={game} />

      <Board onSelectSquare={onUserShot}>
        {game.userShips.map((ship) => (
          <Ship
            key={ship.id}
            shipData={ship}
            // visible={!game.isUserTurn}
            style={{ opacity: !game.isUserTurn ? 1 : 0.125 }}
          />
        ))}

        {game.computerShips.map((ship) => (
          <Ship
            key={ship.id}
            shipData={ship}
            visible={game.isUserTurn}
            showOnlyIfSunk
          />
        ))}

        {game.shotsAsArray
          .filter(({ userId }) => userId === game.computerId)
          .map((shot) => (
            <Shot
              key={shot.id}
              shot={shot}
              style={{ opacity: !game.isUserTurn ? 1 : 0.125 }}
            />
          ))}

        {game.shotsAsArray
          .filter(({ userId }) => userId === game.userId)
          .map((shot) => (
            <Shot
              key={shot.id}
              shot={shot}
              isUserShot
              style={{ opacity: game.isUserTurn ? 1 : 0.5 }}
            />
          ))}
      </Board>
    </div>
  );
});

export const BoardScreen = observer(() => {
  const store = useStore();

  return (
    <div>
      {!store.isGaming && (
        <button
          onClick={() => store.newGame()}
          className="btn btn-green mx-auto block mt-40"
        >
          New Game
        </button>
      )}
      {store.isGaming && <Game game={store.game} />}
    </div>
  );
});
