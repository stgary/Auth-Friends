import React from 'react';
import Login from './components/Login';
import { Route, Link, Switch, useHistory } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendsForm from './components/FriendsForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const history = useHistory();

  return (
      <div className="App">
        <div className='bg'></div>
        <header>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/list">Friends List</Link>
            <Link to="/form">Add Friends</Link>
            <Link onClick={ () => {
              window.localStorage.removeItem('token');
              history.push('/login')
            }}>Log Out</Link>
            </nav>
        </header>
        <Switch>
          <PrivateRoute exact path="/list" component={FriendsList} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path='/form' component={FriendsForm} />
        </Switch>
      </div>
  );
}

export default App;
