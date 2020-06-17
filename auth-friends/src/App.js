import React, { useState, useHistory } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import FriendsForm from './components/FriendsForm';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/list">Friends List</Link>
          </li>
          <li>
            <Link to="/form">Add Friends</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/list" component={FriendsList} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path='/form' component={FriendsForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
