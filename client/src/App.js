import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Leaderboard from './components/Leaderboard';
import Contributors from './components/Contributers';
import Profile from './components/Profile';
import Admin from './components/AdminPanel';
import NotFound from './components/NotFound';

import {Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/leaderboard" component={Leaderboard} />
      <Route exact path="/contributors" component={Contributors} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
