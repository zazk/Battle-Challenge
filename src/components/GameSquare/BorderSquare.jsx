import PropTypes from 'prop-types';

export const BorderSquare = ({ x, y, horizontal, children }) => {
  const realX = x * 40 + (horizontal ? 0 : 10);
  const realY = y * 40 + (!horizontal ? 0 : 10);
  const width = !horizontal ? '30' : '40';
  const height = horizontal ? '30' : '40';
  return (
    <g transform={`translate(${realX},${realY})`}>
      <rect height={height} width={width} stroke="#000" fill="none" />
      <foreignObject height={height} width={width}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className="h-full flex items-center justify-center"
        >
          <span>{children}</span>
        </div>
      </foreignObject>
    </g>
  );
};

BorderSquare.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  horizontal: PropTypes,
  children: PropTypes.node,
};
