import { Ship as ShipStyled } from './styled';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

export const Ship = observer(({ shipData, ...props }) => (
  <ShipStyled
    x={shipData.x + 1}
    y={shipData.y + 1}
    large={shipData.large}
    vertical={shipData.isVertical}
    isSunk={shipData.isSunk}
    {...props}
  />
));

Ship.propTypes = {
  shipData: PropTypes.object,
  visible: PropTypes.bool,
};
