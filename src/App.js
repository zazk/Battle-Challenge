import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App = () => (
  <StoreProvider>
    <Router>
      <div className="bg-gray-800">
        <div id="container">
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
        </div>
      </div>
    </Router>
  </StoreProvider>
);

export default App;
