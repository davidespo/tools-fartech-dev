import React from 'react';
import { store, persistor } from './rdx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NotificationContainer } from 'react-notifications';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import IdUtils from './pages/IdUtils';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/utils/ids" component={IdUtils} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </PersistGate>
    <NotificationContainer />
  </Provider>
);

export default App;
