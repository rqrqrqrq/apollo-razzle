import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { consolidateStreamedStyles } from 'styled-components';
import App from './client/App';

window.main = () =>
  Loadable.preloadReady().then(() => {
    const client = new ApolloClient({
      link: new HttpLink(),
      cache: new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__)),
      ssrForceFetchDelay: 100,
    });

    consolidateStreamedStyles();

    hydrate(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById('root'),
    );
  });

if (module.hot) {
  module.hot.accept('./client/App', () => {
    window.main();
  });
}
