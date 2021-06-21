import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Store from './Store';

export const StoreContext = createContext(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error('useStore must be used in StoreContext children');
  }
  return store;
};

const StoreProvider = ({ children }) => {
  const [store] = useState(() => new Store());

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
