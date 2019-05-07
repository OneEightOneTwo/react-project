import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import HomePage from './routes/HomePage/HomePage';
import found from './routes/found/found';
import xg from './routes/xg/xg';
import Login from './components/Login/Login.js'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/found" exact component={found} />
        <Route path="/xg" exact component={xg} />
        <Route path="/Login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;