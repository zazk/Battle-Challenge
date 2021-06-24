import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

const levels = ['easy', 'medium', 'hard'];

export const GameControl = observer(({ getGame }) => {
  const game = getGame();
  return (
    <div className="mb-4">
      <button
        className="btn mx-2"
        onClick={() => (game?.isPaused ? () => game?.pausePlayGame() : game?.startGame())}
        disabled={!game || (game.isGaming && !game.isPaused)}
      >
        <FontAwesomeIcon icon="play" />
      </button>
      <button
        className="btn mx-2"
        onClick={() => game?.endGame()}
        disabled={!game || !game?.isGaming}
      >
        <FontAwesomeIcon icon="stop" />
      </button>

      <button
        className="btn mx-2"
        onClick={() => game?.pausePlayGame()}
        disabled={!game || !game?.isGaming || game?.isPaused}
      >
        <FontAwesomeIcon icon="pause" />
      </button>
      {!!game && <span className="text-white mr-2">Level: {levels[game.level]}</span>}
      {!!game && game?.isGaming && (
        <span className="text-white">
          | {game?.isUserTurn ? 'user' : 'computer'} turn
        </span>
      )}
    </div>
  );
});

GameControl.propTypes = {
  game: PropTypes.object,
};
