import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import fire from '../../assets/fire.png';

export default observer(({ shot, className }) =>
  !shot.hit ? (
    <circle
      cx={(shot.x + 1) * 40 + 20}
      cy={(shot.y + 1) * 40 + 20}
      r="10"
      className={clsx(className, 'shot')}
    />
  ) : (
    <image
      x={(shot.x + 1) * 40 + 10}
      y={(shot.y + 1) * 40 + 10}
      href={fire}
      width="20"
      className={className}
    />
  )
);
