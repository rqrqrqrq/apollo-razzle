import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { renderToStringWithData, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from '../client/App';
import stats from '../../build/react-loadable.json';
import schema from './schema';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const render = (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  const context = {};

  // FIXME: modules are duplicated, looks like an error
  // propably should avoid `renderToStringWithData` and
  // use low-level apollo api
  const modules = new Set();

  renderToStringWithData(
    <Capture report={moduleName => modules.add(moduleName)}>
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Capture>,
  ).then(markup => {
    if (context.url) {
      res.redirect(context.url);
    } else {
      // FIXME: spreading to transform `Set` to `Array`
      const bundles = getBundles(stats, [...modules]);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));

      const initialState = client.extract();
      const stateString = JSON.stringify(initialState)
        .replace(/</g, '\\u003c')
        .replace(/"/g, '\\"');

      res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset='utf-8' />
          <title>Welcome to Razzle</title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
        </head>
        <body>
          <div id="root">${markup}</div>
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}"></script>`
              : `<script src="${assets.client.js}" crossorigin></script>`
          }
          ${chunks
            .map(
              chunk =>
                process.env.NODE_ENV === 'production'
                  ? `<script src="/${chunk.file}"></script>`
                  : `<script src="http://${process.env.HOST}:${process.env
                      .PORT + 1}/${chunk.file}"></script>`,
            )
            .join('\n')}
          <script>
            window.__APOLLO_STATE__ = '${stateString}';
            window.main();
          </script>
        </body>
      </html>
    `);
    }
  });
};

export default render;
