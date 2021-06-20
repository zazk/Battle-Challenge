import { useEffect, useCallback } from 'react';
import Ship from '../../components/Ship';
import Shot from '../../components/Shot';
import Board from '../../components/Board';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import randomPosition from '../../utils/randomPosition';

import { useStore } from '../../store';

export const BoardScreen = observer(() => {
  const { game } = useStore();
  useEffect(() => game.newGame(), []);

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
    <div>
      <div>
        <button onClick={() => game.startGame()} disabled={game.isGaming}>
          empezar Juego
        </button>
        <button onClick={() => game.endGame()} disabled={!game.isGaming}>
          terminar Juego
        </button>
        <button onClick={() => game.pausePlayGame()} disabled={!game.isGaming}>
          {game.isPaused ? 'continuar' : 'pausar'} Juego
        </button>
        <span>
          turno de {game.isUserTurn ? 'el usuario' : 'la computadora'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <p style={{ textAlign: 'center' }}>tablero del usuario</p>
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
        <div>
          <p style={{ textAlign: 'center' }}>tablero de la computadora</p>
          <Board onSelectSquare={onUserShot}>
            {game.computerShips.map((ship) => (
              <Ship
                key={ship.id}
                shipData={ship}
                // visible={!game.isUserTurn}
                style={{ opacity: game.isUserTurn ? 1 : 0.5 }}
              />
            ))}

            {game.shotsAsArray
              .filter(({ userId }) => userId === game.userId)
              .map((shot) => (
                <Shot key={shot.id} shot={shot} isUserShot />
              ))}
          </Board>
        </div>
      </div>
    </div>
  );
});
