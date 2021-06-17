import { useState, useEffect } from 'react';
import { Ship as ShipStyled } from './styled';
import PropTypes from 'prop-types';
import useShot from '../../hooks/useShot';
import ShipData from '../../utils/ShipData';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

export const Ship = observer(({ x, y, large, vertical }) => {
  const [shipData] = useState(() => new ShipData());
  const shotContext = useShot();

  useEffect(() => {
    shipData.setPosition(x, y);
    runInAction(() => {
      shipData.large = large;
      shipData.isVertical = vertical;
    });
  }, [x, y, large, vertical]);

  useEffect(() => {
    const unsubscribe = shotContext.subscribe(([x, y]) => {
      if (shipData.isInPosition(x, y)) {
        shotContext.shotAcerted(shipData.setShot(x, y), x, y);
      }
    });

    return unsubscribe;
  }, [shotContext]);

  return (
    <ShipStyled
      x={shipData.x + 1}
      y={shipData.y + 1}
      large={shipData.large}
      vertical={shipData.isVertical}
      isSunk={shipData.isSunk}
    />
  );
});

Ship.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  large: PropTypes.number,
  vertical: PropTypes.bool,
};
