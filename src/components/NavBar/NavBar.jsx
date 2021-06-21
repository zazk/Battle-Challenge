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

export const NavBar = () => (
  <div className="p-6 w-24">
    <div className="flex flex-col space-y-4">
      {/* <Link icon="home" path="/" /> */}
      <Link icon="th" path="/board" />
      <Link icon="history" path="/history" />
      <Link icon="cog" path="/config" />
    </div>
  </div>
);
