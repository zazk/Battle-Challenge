import styled from 'styled-components/macro';
import { observer } from 'mobx-react-lite';

const Shot = styled('div')`
  grid-column: ${({ x }) => x + 1};
  grid-row: ${({ y }) => y + 1};
  background-color: ${({ hit }) => (hit ? 'blue' : 'red')};
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  align-self: center;
  justify-self: center;
  border-radius: 100%;
  pointer-events: none;
`;

export default observer(({ shot, ...props }) => (
  <Shot x={shot.x + 1} y={shot.y + 1} hit={shot.hit} {...props} />
));
