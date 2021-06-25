import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

const createShip = (large, isVertical) => {
  const size = 16 + 38 * (large - 1);
  return isVertical
    ? `M 20 5 l -10 10 v ${size} l 5 5  h  10 l  5 -5 v -${size} z`
    : `M 5 20 l  10 10 h ${size} l 5 -5 v -10 l -5 -5 h -${size} z`;
};
// TODO: drag and drop
export const Ship = observer(({ shipData, visible = true, showOnlyIfSunk = false }) => {
  const hidden = showOnlyIfSunk ? !(visible && shipData.isSunk) : !visible;

  return (
    <g
      transform={`translate(${(shipData.x + 1) * 40},${(shipData.y + 1) * 40})`}
      className={clsx(hidden && 'hidden')}
    >
      <path
        d={createShip(shipData.large, shipData.isVertical)}
        data-size={shipData.large}
        className={clsx('ship', shipData.isSunk && 'ship-sunk')}
      />
    </g>
  );
});

Ship.propTypes = {
  shipData: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};
