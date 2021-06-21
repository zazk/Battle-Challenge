import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components/macro';
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
  grid-template-columns: 48px auto;
  grid-template-rows: 40px auto;
  gap: 1.4rem;
  grid-template-areas:
    'nav header'
    'nav body';
  min-height: 100vh;
`;

const App = () => (
  <StoreProvider>
    <Router>
      <div className="bg-gray-800">
        <Root className="p-6 container mx-auto">
          <NavBar style={{ gridArea: 'nav' }} />
          <header style={{ gridArea: 'header' }}>
            <h1 className="text-white text-4xl">Battleship</h1>
          </header>
          <main style={{ gridArea: 'body' }}>
            <Switch>
              {routes.map(({ path, Component, exact = true }) => (
                <Route key={path} path={path} exact={exact}>
                  <Component />
                </Route>
              ))}
            </Switch>
          </main>
        </Root>
      </div>
    </Router>
  </StoreProvider>
);

export default App;
