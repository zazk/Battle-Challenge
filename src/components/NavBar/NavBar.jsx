import { useHistory, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Link = ({ icon, path }) => {
  const history = useHistory();
  const isPath = useRouteMatch({ path, strict: true });
  return (
    <button
      className={clsx('btn', isPath && 'btn-green')}
      onClick={() => history.push(path)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

Link.propTypes = {
  icon: PropTypes.string,
  path: PropTypes.string,
};

export const NavBar = ({ className, ...props }) => (
  <div className={clsx('w-12 mb-3 md:mb-0', className)} {...props}>
    <div className="flex flex-row space-x-4 md:flex-col md:space-y-4 md:space-x-0">
      <Link icon="th" path="/board" />
      <Link icon="history" path="/history" />
      <Link icon="cog" path="/config" />
    </div>
  </div>
);

NavBar.propTypes = {
  className: PropTypes.string,
};
