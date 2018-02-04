import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ServerStyleSheet } from 'styled-components';
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

  getDataFromTree(
    <ApolloProvider client={client}>
      {/* styled */}
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
      {/* /styled */}
    </ApolloProvider>,
  ).then(() => {
    if (context.url) {
      res.redirect(context.url);
      res.end();
      return;
    }
    res.write(
      `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset='utf-8' />
<title>Welcome to Razzle</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1">${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
</head>
<body>
<div id="root">`,
    );

    const modules = [];

    const sheet = new ServerStyleSheet();

    const jsx = sheet.collectStyles(
      <Capture report={moduleName => modules.push(moduleName)}>
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </Capture>,
    );

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

    stream.pipe(res, { end: false });
    stream.on('end', () => {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));

      res.write(
        `</div>${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.vendor.js}"></script>`
            : `<script src="${assets.vendor.js}" crossorigin></script>`
        }${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}"></script>`
            : `<script src="${assets.client.js}" crossorigin></script>`
        }${chunks
          .map(
            chunk =>
              process.env.NODE_ENV === 'production'
                ? `<script src="/${chunk.file}"></script>`
                : `<script src="http://${process.env.HOST}:${process.env.PORT +
                    1}/${chunk.file}"></script>`,
          )
          .join('')}`,
      );

      const initialState = client.extract();
      const stateString = JSON.stringify(initialState)
        .replace(/</g, '\\u003c')
        .replace(/"/g, '\\u0022')
        .replace(/'/g, '\\u0027');

      res.end(`<script>
window.__APOLLO_STATE__ = '${stateString}';
window.main();
</script>
</body>
</html>`);
    });
  });
};

export default render;
