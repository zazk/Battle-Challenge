import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const HistoryItem = ({ win, name, date, onDelete }) => (
  <div
    className={clsx(
      'p-4',
      'mb-5',
      'flex',
      'divide-x-2',
      'rounded-lg',
      'shadow-md',
      'bg-opacity-60',
      win
        ? ['bg-green-100', 'divide-green-800']
        : ['bg-red-100', 'divide-red-900']
    )}
  >
    <div className="px-3 flex font-semibold">
      <div className={clsx('text-gray-600', 'mr-3')}>
        <FontAwesomeIcon icon="history" />
      </div>
      {win ? 'Winner' : 'Loser'}
    </div>
    <div className="px-3">{name || <i>anonymous</i>}</div>
    <div className="px-3 ml-auto">{date}</div>
    <div>
      <button className="btn-icon text-gray-600 -my-4 -mr-3" onClick={onDelete}>
        <FontAwesomeIcon icon="trash" />
      </button>
    </div>
  </div>
);

HistoryItem.propTypes = {
  win: PropTypes.bool,
  name: PropTypes.string,
  date: PropTypes.string,
  onDelete: PropTypes.func,
};

export default HistoryItem;
