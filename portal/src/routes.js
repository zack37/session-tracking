import 'rxjs';

import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import App from './app/AppComponent';
import DashboardContainer from './dashboard/DashboardContainer';
import React from 'react';

const routes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={DashboardContainer} />
      </Switch>
    </App>
  </Router>
);

export default routes;
