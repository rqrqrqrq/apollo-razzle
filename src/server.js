import express from 'express';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import compression from 'compression';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './server/schema';
import render from './server/render';

const app = express();

app
  .use(compression())
  .disable('x-powered-by')
  .use(serveStatic(process.env.RAZZLE_PUBLIC_DIR))
  .post('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  .get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .get('/*', render);

export default app;
