import React from 'react';

import { Route, Switch } from 'react-router-dom';

const DynamicRouter = ({ routes }) => (
  <Switch>
    {routes.map(({ url, Component }) => (
      <Route exact path={url} component={Component} key={url} />
    ))}
    <Route component={routes[0].Component} />
  </Switch>
);

export default DynamicRouter;
