import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './components/GlobalStyles';
import StoreProvider from './store';
import NavBar from './components/NavBar';
import routes from './routes';
import ShotContextProvider from './contexts/shotContext';

const Root = styled('div')`
  display: grid;
  grid-template-areas: 'nav main';
  grid-template-columns: 120px auto;
`;

function App() {
  return (
    <StoreProvider>
      <GlobalStyles />
      <ShotContextProvider>
        <Router>
          <Root>
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
      </ShotContextProvider>
    </StoreProvider>
  );
}

export default App;
