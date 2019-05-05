
const api = require('./api');
const user = require('./user');

module.exports = (app) => {
  app.use('/api', api);
  app.use('/api/user', user);
}
