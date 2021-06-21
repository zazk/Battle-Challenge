import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export const Checkbox = ({ checked, onClick }) => (
  <button className="text-white" onClick={onClick}>
    <FontAwesomeIcon icon={checked ? 'check-square' : ['far', 'square']} />
  </button>
);
Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};
