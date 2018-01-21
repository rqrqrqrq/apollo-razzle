import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route exact path="/" render={() => 'Home'} />
  </Switch>
);

export default App;
