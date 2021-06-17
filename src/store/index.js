import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import GameStore from './game';

export const StoreContext = createContext(null);

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const store = useMemo(
    () => ({
      game: new GameStore(),
    }),
    []
  );
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
