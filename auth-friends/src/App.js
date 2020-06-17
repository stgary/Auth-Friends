import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendsForm from './components/FriendsForm';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const history = useHistory();
  
  const handleChange = e => {
    window.localStorage.removeItem('token');
    history.push('/login')
  };
 
  return (
      <div className="App">
        <header>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/list">Friends List</Link>
            <Link to="/form">Add Friends</Link>
            <button onClick={handleChange}>Log Out</button>
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
