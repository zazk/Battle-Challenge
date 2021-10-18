import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

const levels = ['easy', 'medium', 'hard'];

export const GameControl = observer(({ getGame }) => {
  const game = getGame();
  console.log('Game', game);
  return (
    <div className="mb-4 flex flex-wrap">
      <button
        className="btn mr-2"
        onClick={() => (game.isPaused ? () => game.pausePlayGame() : game.startGame())}
        disabled={!game || (game.isGaming && !game.isPaused) || game.isGameOver}
      >
        <FontAwesomeIcon icon="play" />
      </button>
      <button
        className="btn mx-2"
        onClick={() => game.endGame()}
        disabled={!game || !game.isGaming}
      >
        <FontAwesomeIcon icon="stop" />
      </button>

      <button
        className="btn mx-2"
        onClick={() => game.pausePlayGame()}
        disabled={!game || !game.isGaming || game.isPaused}
      >
        <FontAwesomeIcon icon="pause" />
      </button>
      {!!game && (
        <p className="whitespace-nowrap text-white mr-2 mt-2">
          Level: {levels[game.level]}
        </p>
      )}
    </div>
  );
});

GameControl.propTypes = {
  getGame: PropTypes.func.isRequired,
};
