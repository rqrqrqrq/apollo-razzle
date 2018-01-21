import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => null,
});

const Store = Loadable({
  loader: () => import('./Store'),
  loading: () => null,
});

const About = Loadable({
  loader: () => import('./About'),
  loading: () => null,
});

const Link = props => <NavLink activeStyle={{ color: 'red' }} {...props} />;

const App = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link exact to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/redirect">redirect test</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/store" component={Store} />
      <Route path="/about" component={About} />
      <Redirect to="/store" />
    </Switch>
  </div>
);

export default App;
