import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

const levels = ['easy', 'medium', 'hard'];

const GameControl = observer(({ game }) => {
  return (
    <div className="mb-4">
      <button
        className="btn mx-2"
        onClick={() =>
          game.isPaused ? () => game.pausePlayGame() : game.startGame()
        }
        disabled={game.isGaming && !game.isPaused}
      >
        <FontAwesomeIcon icon="play" />
      </button>
      <button
        className="btn mx-2"
        onClick={() => game.endGame()}
        disabled={!game.isGaming}
      >
        <FontAwesomeIcon icon="stop" />
      </button>

      <button
        className="btn mx-2"
        onClick={() => game.pausePlayGame()}
        disabled={!game.isGaming || game.isPaused}
      >
        <FontAwesomeIcon icon="pause" />
      </button>
      <span className="text-white mr-2">Level: {levels[game.level]} |</span>
      <span className="text-white">
        Turno de {game.isUserTurn ? 'el usuario' : 'la computadora'}
      </span>
    </div>
  );
});

GameControl.propTypes = {
  game: PropTypes.object,
};

export default GameControl;
