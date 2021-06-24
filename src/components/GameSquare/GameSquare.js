import { observer } from 'mobx-react-lite';
import { computed } from 'mobx';
import { Square } from './styled';

export const SquareEnhanced = observer(({ getGame, ...props }) => {
  const { x, y } = props;

  const isDisabled = computed(() => getGame().scuareIsDisabled(x, y)).get();

  return <Square {...props} disabled={isDisabled} />;
});
