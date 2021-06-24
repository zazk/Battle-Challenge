import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { GAME_LEVELS, DATE_FORMAT } from '../../utils/constants';

const HistoryItem = ({ useWin, name, endDate, onDelete, level }) => (
  <div
    className={clsx(
      'p-4',
      'mb-5',
      'flex',
      'divide-x-2',
      'rounded-lg',
      'shadow-md',
      'bg-opacity-60',
      useWin
        ? ['bg-green-100', 'divide-green-800']
        : ['bg-red-100', 'divide-red-900']
    )}
  >
    <div className="px-3 flex font-semibold">
      <div className={clsx('text-gray-600', 'mr-3')}>
        <FontAwesomeIcon icon="history" />
      </div>
      {useWin ? 'Winner' : 'Loser'}
    </div>
    <div className="px-3">{name || <i>anonymous</i>}</div>
    <div className="px-3">level: {GAME_LEVELS[level]}</div>
    <div className="px-3 ml-auto">{moment(endDate).format(DATE_FORMAT)}</div>
    <div>
      <button className="btn-icon text-gray-600 -my-4 -mr-3" onClick={onDelete}>
        <FontAwesomeIcon icon="trash" />
      </button>
    </div>
  </div>
);

HistoryItem.propTypes = {
  useWin: PropTypes.bool,
  name: PropTypes.string,
  endDate: PropTypes.string,
  level: PropTypes.number,
  onDelete: PropTypes.func,
};

export default HistoryItem;
