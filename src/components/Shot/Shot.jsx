import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import fire from '../../assets/fire.png';
import PropTypes from 'prop-types';

export const Shot = observer(({ shot, className }) => {
  const x = (shot.x + 1) * 40 + 20;
  const y = (shot.y + 1) * 40 + 20;
  return !shot.hit ? (
    <circle cx={x} cy={y} r="10" className={clsx(className, 'shot')} />
  ) : (
    <image x={x - 10} y={y - 10} href={fire} width="20" className={className} />
  );
});

Shot.propTypes = {
  shot: PropTypes.object.isRequired,
  className: PropTypes.string,
};
