const root = require('./root');
const users = require('./users');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/', root);
}
