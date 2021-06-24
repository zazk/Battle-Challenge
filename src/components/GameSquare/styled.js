/* eslint-disable react/prop-types */
import styled from 'styled-components/macro';
import clsx from 'clsx';

export const Square = styled(({ x, y, onClick, className, disabled }) => {
  return (
    <rect
      x={(x + 1) * 40}
      y={(y + 1) * 40}
      height="40"
      width="40"
      onClick={onClick}
      className={clsx(className, disabled && 'disabled')}
    />
  );
})`
  stroke: #281d4e;
  fill: #5b49b6;
  &:hover {
    fill: #493a92;
  }
  &:active {
    fill: #372c6d;
  }
  &.disabled {
    /* fill: #474554; */
    fill: #584b9b;
  }
`;

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
