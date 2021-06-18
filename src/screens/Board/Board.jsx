import { useEffect, useCallback } from 'react';
import Ship from '../../components/Ship';
import Shot from '../../components/Shot';
import Board from '../../components/Board';
import { observer } from 'mobx-react-lite';
import { autorun, reaction } from 'mobx';

import { useStore } from '../../store';

export const BoardScreen = observer(() => {
  const { game } = useStore();
  useEffect(() => game.newGame(), []);

  useEffect(
    () =>
      autorun(async () => {
        if (game.isGaming && !game.isUserTurn) {
          await game.makeComputerShot();
          setTimeout(() => game.nextTurn(), 1000);
        }
      }),
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
  });

  return (
    <Board onSelectSquare={onUserShot}>
      {game.userShips.map((ship) => (
        <Ship key={ship.id} shipData={ship} visible={!game.isUserTurn} />
      ))}
      {
        // TODO: remove
        game.computerShips.map((ship) => (
          <Ship key={ship.id} shipData={ship} style={{ opacity: 0.25 }} />
          // <div key={ship.id}>holo</div>
        ))
      }
      {game.shotsAsArray.map(
        (shot) =>
          shot.userId === game.currentUserId && (
            <Shot key={shot.id} shot={shot} />
          )
      )}
    </Board>
  );
});
