import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import useAutorunWithSubscription from '../../hooks/useAutorunWithSubscription';

export const EndGamePrompt = observer(({ getGame }) => {
  const game = getGame();
  const [show, setShow] = useState(false);
  const [userWin, setUserWin] = useState(false);

  useAutorunWithSubscription(() => {
    const subscription = game.gameStatusObervable.subscribe({
      next({ userWin }) {
        setUserWin(userWin);
        setShow(true);
        setTimeout(() => setShow(false), 2000);
      },
      complete() {
        subscription.unsubscribe();
      },
    });

    return subscription;
  }, [game]);

  if (!show) return null;

  const node = (
    // eslint-disable-next-line max-len
    <div className="absolute w-full h-full top-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        you {userWin ? 'Win! 🎉 😎' : 'Lost! 💻'}
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.getElementById('root-portal'));
});

EndGamePrompt.propTypes = {
  getGame: PropTypes.func.isRequired,
};
