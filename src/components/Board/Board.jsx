import { Fragment, useMemo } from 'react';
import range from 'lodash.range';
import PropTypes from 'prop-types';
import Square, { BorderSquare } from '../GameSquare';

export const Board = ({ children, onSelectSquare, getGame }) => {
  const squares = useMemo(
    () =>
      range(100).map((idx) => {
        const x = idx % 10;
        const y = (idx / 10) | 0;
        const includeBorder = idx < 10;
        return (
          <Fragment key={idx}>
            {includeBorder && (
              <>
                <BorderSquare y={idx + 1} x={0}>
                  {idx + 1}
                </BorderSquare>
                <BorderSquare x={idx + 1} y={0} horizontal>
                  {String.fromCharCode(65 + idx)}
                </BorderSquare>
              </>
            )}
            <Square x={x} y={y} onClick={() => onSelectSquare(x, y)} getGame={getGame} />
          </Fragment>
        );
      }),
    [onSelectSquare]
  );

  return (
    <svg viewBox="0 0 440 440" className="board">
      {squares}
      {children}
    </svg>
  );
};

Board.propTypes = {
  children: PropTypes.node,
  onSelectSquare: PropTypes.func,
  getGame: PropTypes.func.isRequired,
};
