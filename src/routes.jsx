import Home from './screens/Home'
import Board from './screens/Board'
import Config from './screens/Config'
import GameHistory from './screens/GameHistory'

const routes = [
  { path: '/', Component: Home },
  { path: '/board', Component: Board },
  { path: '/config', Component: Config },
  { path: '/history', Component: GameHistory },
]

export default routes
