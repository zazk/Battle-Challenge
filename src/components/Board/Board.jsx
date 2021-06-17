import { Fragment } from 'react';
import range from 'lodash.range';
import PropTypes from 'prop-types';
import { Root, Square, BorderSquare } from './styled';

export const Board = ({ children, onSelectSquare }) => {
  return (
    <Root>
      {range(100).map((idx) => (
        <Square
          key={idx}
          x={idx % 10}
          y={(idx / 10) | 0}
          onClick={() => onSelectSquare(idx % 10, (idx / 10) | 0)}
        />
      ))}

      {range(10).map((idx) => (
        <Fragment key={`border-${idx}`}>
          <BorderSquare y={idx + 2} x={1}>
            {idx}
          </BorderSquare>
          <BorderSquare x={idx + 2} y={1}>
            {String.fromCharCode(65 + idx)}
          </BorderSquare>
        </Fragment>
      ))}
      {children}
    </Root>
  );
};

Board.propTypes = {
  children: PropTypes.node,
  onSelectSquare: PropTypes.func,
};
