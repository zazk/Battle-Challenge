import { Prompt } from 'react-router-dom';
import Ship from '../../components/Ship';
import Shot from '../../components/Shot';
import Board from '../../components/Board';
import GameControl from '../../components/GameControl';
import EndGamePrompt from '../../components/EndGamePrompt';
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
    <div
      className="flex flex-col items-center mt-4 md:mt-0"
      style={{ maxHeight: '80vh' }}
    >
      <div className="flex">
        {!store.game.isGaming && (
          <div>
            <button onClick={() => store.newGame()} className="btn btn-green mr-4">
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
      <section className="text-white divide-x-2 flex mt-2 divide-gray-600">
        <p className="px-3">
          Your ships: <b>{store.game.userShipsAlive}</b>
        </p>
        <p className="px-3">
          Enemy ships: <b>{store.game.computerShipsAlive}</b>
        </p>
      </section>

      <Prompt when={store.isGaming} message="Are you sure you want to leave?" />
      <EndGamePrompt getGame={() => store.game} />
    </div>
  );
});
