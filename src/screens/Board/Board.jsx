import { Prompt } from 'react-router-dom';
import Ship from '../../components/Ship';
import Shot from '../../components/Shot';
import Board from '../../components/Board';
import GameControl from '../../components/GameControl';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { computed } from 'mobx';
import { useStore } from '../../store';
import useGameController from './useGameController';
import clsx from 'clsx';

export const BoardScreen = observer(() => {
  const store = useStore();

  useGameController(store);

  const onUserShot = useCallback((x, y) => {
    try {
      if (store.game.isUserTurn) store.game.makeUserShot(x, y);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const computerShots = computed(() =>
    store.game.shotsAsArray.filter(({ userId }) => userId === store.game.computerId)
  ).get();

  const userShots = computed(() =>
    store.game.shotsAsArray.filter(({ userId }) => userId === store.game.userId)
  ).get();

  return (
    <div className="flex flex-col items-center">
      <div className="flex" style={{ minWidth: '40vw' }}>
        {!store.game.isGaming && (
          <div>
            <button onClick={() => store.newGame()} className="btn btn-green">
              New Game
            </button>
          </div>
        )}
        <GameControl getGame={() => store.game} />
      </div>

      <Board onSelectSquare={onUserShot} getGame={() => store.game}>
        {store.game.userShips.map((ship) => (
          <Ship key={ship.id} shipData={ship} visible={!store.game.isUserTurn} />
        ))}

        {store.game.computerShips.map((ship) => (
          <Ship
            key={ship.id}
            shipData={ship}
            visible={store.game.isUserTurn}
            showOnlyIfSunk
          />
        ))}

        {computerShots.map((shot) => (
          <Shot
            key={shot.id}
            shot={shot}
            className={clsx(store.game.isUserTurn && 'hidden')}
          />
        ))}

        {userShots.map((shot) => (
          <Shot
            key={shot.id}
            shot={shot}
            isUserShot
            className={clsx(!store.game.isUserTurn && 'hidden')}
          />
        ))}
      </Board>
      <Prompt when={store.isGaming} message="Are you sure you want to leave?" />
    </div>
  );
});
// </div>
