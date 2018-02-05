import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { consolidateStreamedStyles } from 'styled-components';
import App from './client/App';
import { resolvers, defaults } from './client/schema';

consolidateStreamedStyles();

window.main = () =>
  Loadable.preloadReady().then(() => {
    const cache = new InMemoryCache().restore(
      JSON.parse(window.__APOLLO_STATE__),
    );

    const stateLink = withClientState({
      cache,
      resolvers,
      defaults,
    });

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([stateLink, new HttpLink()]),
      ssrForceFetchDelay: 100,
    });

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
