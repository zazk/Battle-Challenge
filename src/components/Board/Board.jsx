import { Fragment, useEffect, useState, useRef } from 'react';
import range from 'lodash.range';
import PropTypes from 'prop-types';
import { Root, Square, BorderSquare } from './styled';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { useStore } from '../../store';

const SquareEnhanced = observer((props) => {
  const { x, y } = props;
  const { game } = useStore();
  const [disable, setDisable] = useState(false);
  const subscriptionRef = useRef(null);

  useEffect(
    () =>
      autorun(() => {
        if (game.isGaming) {
          if (subscriptionRef.current) subscriptionRef.current?.unsubscribe();
          subscriptionRef.current = game.shotSubscribe(
            ({ x: shotX, y: shotY, userId }) => {
              if (userId === game.userId && shotX === x && shotY === y) {
                setDisable(true);
              }
            }
          );
        }
      }),
    [x, y]
  );

  useEffect(() => () => subscriptionRef.current?.unsubscribe(), []);

  return (
    <Square
      {...props}
      disabled={disable || !game.isGaming || game.isPaused || !game.isUserTurn}
    />
  );
});

export const Board = ({ children, onSelectSquare }) => {
  return (
    <Root>
      {range(100).map((idx) => (
        <SquareEnhanced
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
