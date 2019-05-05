const http = require('http'); // importing the http package
const debug = require('debug')('node-angular');
const app = require('./app'); // the path to our express app

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;

};

const onError = error => {
  if (error.svscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  debug('Listening on ' + bind);
};

//8801 for live 3000 for local
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

