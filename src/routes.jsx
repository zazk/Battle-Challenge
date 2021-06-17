import Home from './screens/Home';
import Board from './screens/Board';
import Config from './screens/Config';
import GameHistory from './screens/GameHistory';

const routes = [
  { path: '/', Component: Home, exact: true },
  { path: '/board', Component: Board, exact: true },
  { path: '/config', Component: Config, exact: true },
  { path: '/history', Component: GameHistory, exact: true },
];

export default routes;
