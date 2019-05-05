import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import HomePage from './routes/HomePage/HomePage';
import found from './routes/found/found';
import xg from './routes/xg/xg';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/found" exact component={found} />
        <Route path="/xg" exact component={xg} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;