import { useContext } from 'react';
import { ShotContext } from '../../contexts/shotContext';

export default function useShot() {
  const shotContext = useContext(ShotContext);
  if (shotContext === null) {
    throw new Error('useShot was used outside ShotContext');
  }
  return shotContext;
}
