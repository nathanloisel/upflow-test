/* eslint-disable no-console */
import http from 'http';
console.log('⏩  Server starting...');
require('cross-fetch/polyfill');

const app = require('./server').default;

let currentHandler = app.callback();
const server = http.createServer(currentHandler);

const PORT = process.env.PORT || 3000;

server
  .listen(PORT, () => {
    console.log(
      '✅  🎉  ' +
        'Server started ! listening on ' +
        '🤔  ' +
        `http://localhost:${PORT}`
    );
  })
  .on('error', (error) => {
    console.log(error);
  });

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      import('./server').then((newServer) => {
        const newHandler = newServer.default.callback();
        server.removeListener('request', currentHandler);
        server.on('request', newHandler);
        currentHandler = newHandler;
      });
    } catch (error) {
      console.error(error);
    }
  });
}
