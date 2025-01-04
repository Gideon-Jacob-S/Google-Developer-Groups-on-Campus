import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Leaderboard from './components/Leaderboard'
import Contributors from './components/Contributers'
import Profile from './components/Profile'
import Admin from './components/AdminPanel'
import NotFound from './components/NotFound'

import {Route, Switch, Redirect} from 'react-router-dom'
import NewUserRoute from './components/NewUserRoute'
import UserRoute from './components/UserRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contributors" component={Contributors} />
      <AdminRoute exact path="/admin" component={Admin} />
      <UserRoute exact path="/profile" component={Profile} />
      <UserRoute exact path="/leaderboard" component={Leaderboard} />
      <NewUserRoute exact path="/login" component={Login} />
      <NewUserRoute exact path="/signup" component={SignUp} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default App
