import React from 'react';
import { store, persistor } from './rdx';
import routes from './routes';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NotificationContainer } from 'react-notifications';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          {routes.map(({ url, component, exact }) => (
            <Route
              exact={exact !== false}
              path={url}
              component={component}
              key={url}
            />
          ))}

          <Route component={NotFound} />
        </Switch>
      </Router>
    </PersistGate>
    <NotificationContainer />
  </Provider>
);

export default App;
