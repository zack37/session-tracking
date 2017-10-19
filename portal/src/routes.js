import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './app/AppComponent';
import React from 'react';

// import Container from './container/???';

const Container = () => {
  return <div>Container</div>;
};

const routes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Container} />
      </Switch>
    </App>
  </Router>
);

export default routes;
