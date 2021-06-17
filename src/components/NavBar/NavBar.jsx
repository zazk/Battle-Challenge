import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled('nav')`
  display: grid;
  grid-gap: 10px;
`;

const Link = styled(NavLink)`
  background-color: #0005;
  padding: 10px;
  text-align: center;
  border-radius: 6px;
  margin: 0 10px;
  &.selected {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: 0;
  }
`;

export const NavBar = () => {
  return (
    <Nav>
      <Link activeClassName="selected" to="/">
        home
      </Link>
      <Link activeClassName="selected" to="/board">
        board
      </Link>
      <Link activeClassName="selected" to="/history">
        history
      </Link>
      <Link activeClassName="selected" to="/config">
        config
      </Link>
    </Nav>
  );
};
