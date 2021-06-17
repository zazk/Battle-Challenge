import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { observable, runInAction } from 'mobx';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export const ShotContext = createContext(null);

const ShotContextProvider = ({ children }) => {
  // const value = null;
  // const [value] = useState(() => new BehaviorSubject())

  const value = useMemo(() => {
    const subject = new BehaviorSubject([]);
    const shots = observable([]);
    return {
      // userId: uuidv4(),
      // computerId: uuidv4(),
      shots,
      shot(x, y, user) {
        // console.log('shot!!');
        runInAction(() =>
          shots.push({
            x,
            y,
            acerted: false,
            user,
          })
        );
        subject.next([x, y]);
      },
      shotAcerted(shipSunk, x, y) {
        const shotIndex = shots.findIndex((shot) => {
          console.log(shot.x, x, shot.y, y);
          return shot.x === x && shot.y === y;
        });
        console.log(shotIndex);
        if (shotIndex >= 0) {
          runInAction(() => {
            shots[shotIndex].acerted = true;
          });
        }
        if (shipSunk) console.log('barco undidoooooo!!!!!');
      },
      subscribe(...args) {
        return subject.subscribe(...args);
      },
    };
  }, []);

  return <ShotContext.Provider value={value}>{children}</ShotContext.Provider>;
};

ShotContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ShotContextProvider;
