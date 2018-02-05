import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { applyGlobalStyles } from './globalStyles';
import Loading from './Loading';
import { Header } from './Header';

applyGlobalStyles();

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
  timeout: 10000,
});

const Store = Loadable({
  loader: () => import('./Store'),
  loading: Loading,
  timeout: 10000,
});

const About = Loadable({
  loader: () => import('./About'),
  loading: Loading,
  timeout: 10000,
});

const Link = props => <NavLink activeStyle={{ color: 'red' }} {...props} />;

const App = () => (
  <div>
    <Header>Title</Header>
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
