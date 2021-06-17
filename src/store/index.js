import PropTypes from 'prop-types';

export const useStore = () => null;

const StoreProvider = ({ children }) => {
  return <>{children}</>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
