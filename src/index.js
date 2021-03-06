import http from 'http';
import Loadable from 'react-loadable';
import app from './server';

let currentApp = app;

Loadable.preloadAll().then(() => {
  const server = http.createServer(app);

  server.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.log(error);
    }

    console.log('🚀 started');
  });

  if (module.hot) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
      console.log('🔁  HMR Reloading `./server`...');
      server.removeListener('request', currentApp);
      const newApp = require('./server').default;
      server.on('request', newApp);
      currentApp = newApp;
    });
  }
});
