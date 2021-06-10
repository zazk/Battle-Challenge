import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyles from './components/GlobalStyles'

import routes from './routes'
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </>
  )
}

export default App
