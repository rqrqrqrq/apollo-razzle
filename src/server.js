import express from 'express';
import render from './server/render';

const app = express();

app
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', render);

export default app;
