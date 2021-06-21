import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';

import {
  Login, Register, Director, Admin, Teacher,
  NotFound, Error } from './pages';
import { ProtectedRoute } from './components';

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/admin" component={ Admin } />
        <ProtectedRoute path="/director" component={ Director } />
        <ProtectedRoute path="/teacher" component={ Teacher } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/error" component={ Error } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
