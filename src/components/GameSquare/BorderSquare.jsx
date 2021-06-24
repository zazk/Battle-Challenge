import PropTypes from 'prop-types';

export const BorderSquare = ({ x, y, horizontal, children }) => (
  <g>
    <rect
      x={x * 40 + (horizontal ? 0 : 10)}
      y={y * 40 + (!horizontal ? 0 : 10)}
      height={horizontal ? '30' : '40'}
      width={!horizontal ? '30' : '40'}
      stroke="#000"
      fill="none"
    />
    <text
      x={x * 40 + (horizontal ? 0 : 10) + 10}
      y={y * 40 + (!horizontal ? 0 : 10) + 20}
    >
      {children}
    </text>
  </g>
);
BorderSquare.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  horizontal: PropTypes,
  children: PropTypes.node,
};
