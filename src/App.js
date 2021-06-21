import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import StoreProvider from './store';
import NavBar from './components/NavBar';
import routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faTh,
  faHistory,
  faCog,
  faPlay,
  faStop,
  faPause,
  faSpinner,
  faTrash,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

library.add(
  faHome,
  faTh,
  faHistory,
  faCog,
  faPlay,
  faStop,
  faPause,
  faSpinner,
  faTrash,
  faSquare,
  faCheckSquare
);

const Root = styled('div')`
  display: grid;
  grid-template-areas: 'nav main';
  grid-template-columns: 128px auto;
  min-height: 100vh;
`;

function App() {
  return (
    <StoreProvider>
      <Router>
        <Root className="bg-gray-800">
          <NavBar />
          <Switch>
            {routes.map(({ path, Component, exact = true }) => (
              <Route key={path} path={path} exact={exact}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Root>
      </Router>
    </StoreProvider>
  );
}

export default App;
